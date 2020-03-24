import { APIGatewayProxyHandler } from 'aws-lambda';
import { SDK } from 'beekeeper';
import { Post } from 'beekeeper/dist/model';

import { getConfig } from './config';

import { SubmissionPostRenderer } from './renderer';
import { PostSender } from './sender';
import { WebhookForwarder } from '../webhook/forwarder';
import { SubmissionPostForwarder } from './forwarder';


export interface Config {
    tenantURL: string;
    token: string;
    streamId: number;
}

let forwarder: WebhookForwarder<Submission, Post>;

export const handle: APIGatewayProxyHandler = async (event) => {
    console.log('Received new Gateway Event');
    if (!forwarder) {
        console.log('Setting up forwarder');
        const config = getConfig();
        forwarder = createForwarderFromConfig(config);
    }

    if (typeof event.body !== 'string') {
        throw new Error('No event payload');
    }

    const notification = JSON.parse(event.body) as Beekeeper.FormSubmittedNotification;
    console.log(`Received notifcation with id ${notification.notification_id} and type ${notification.event_type} for ${notification.tenant_fqdn}`);
    const submission = parseSubmissionFromNotification(notification);

    await forwarder.forward(submission);
    console.log(`Forwarded for submission with id ${submission.id}`);

    return {
        statusCode: 200,
        body: 'ok',
    };
};

function createForwarderFromConfig(config: Config): WebhookForwarder<Submission, Post> {
    const { streamId } = config;
    const credentials = credentialsFromConfig(config);
    const sdk = new SDK(credentials);

    const sender = new PostSender(sdk, streamId);
    const renderer = new SubmissionPostRenderer();
    return new SubmissionPostForwarder(renderer, sender);
}

const credentialsFromConfig = ({ tenantURL, token }: Config) => ({ tenantURL, token });

const parseSubmissionFromNotification = (notification: Beekeeper.FormSubmittedNotification): Submission => {
    const { form_id, form_version, data, submitted_at, submitted_by, id} = notification.payload;

    const submission: Submission = {
        form_id,
        form_version,
        data,
        submitted_at,
        submitted_by,
        id,
    };
    return submission;   
};
