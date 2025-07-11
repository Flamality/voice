import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

client.setEndpoint("https://nyc.cloud.appwrite.io/v1").setProject("flamality");

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage };
