import { SDK } from "beekeeper";
import { Post, NumericIdentifier } from 'beekeeper/dist/model';

import { Sender } from '../webhook/forwarder';


export class PostSender implements Sender<Post> {
    #sdk: SDK;
    #streamId: NumericIdentifier;
    
    constructor(sdk: SDK, streamId: number) {
        this.#sdk = sdk;
        this.#streamId = new NumericIdentifier(streamId);
    }
    
    async send({ title, text }: Post): Promise<void> {
        const user = await this.#sdk.getMe();
        await this.#sdk.Posts.create({
            title,
            text,
            streamid: this.#streamId,
            user_id: user.id,
        });
    }
}