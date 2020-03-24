import { Post } from 'beekeeper/dist/model';
import { AbstractWebhookForwarder } from '../webhook/forwarder';

export class SubmissionPostForwarder extends AbstractWebhookForwarder<Submission, Post> { };