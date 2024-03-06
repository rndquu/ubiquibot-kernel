import { EmitterWebhookEvent as WebhookEvent, EmitterWebhookEventName as WebhookEventName } from "@octokit/webhooks";
import { customOctokit } from "./github-client";
import { GitHubEventHandler } from "./github-event-handler";

export class GitHubContext<T extends WebhookEventName = WebhookEventName> {
  public key: WebhookEventName;
  public name: WebhookEventName;
  public id: string;
  public payload: WebhookEvent<T>["payload"];
  public octokit: InstanceType<typeof customOctokit>;
  public eventHandler: InstanceType<typeof GitHubEventHandler>;

  constructor(eventHandler: InstanceType<typeof GitHubEventHandler>, event: WebhookEvent<T>, octokit: InstanceType<typeof customOctokit>) {
    this.eventHandler = eventHandler;
    this.name = event.name;
    this.id = event.id;
    this.payload = event.payload;
    if ("action" in this.payload) {
      this.key = `${this.name}.${this.payload.action}` as WebhookEventName;
    } else {
      this.key = this.name;
    }
    this.octokit = octokit;
  }
}

export type SimplifiedContext = Omit<GitHubContext, keyof WebhookEventName>;
