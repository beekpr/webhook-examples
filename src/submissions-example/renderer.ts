import { Post } from 'beekeeper/dist/model';

import { Renderer } from '../webhook/forwarder';


export class SubmissionPostRenderer implements Renderer<Submission, Post> {
    render(notification: Submission): Post {
        throw new Error("Method not implemented.");
    }
}