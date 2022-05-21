import { UserCreatedListener } from "../events/Listeners/user-created-listener";
import { natsWrapper } from "../nats-wrapper";

export const connectEventBus = async () => {
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID!,
            process.env.NATS_CLIENT_ID!,
            process.env.NATS_URL!
        );
        new UserCreatedListener(natsWrapper.client).listen();

    }
    catch (err: any) {
        console.log(err.message);
    }
}