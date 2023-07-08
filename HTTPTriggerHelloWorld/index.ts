import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://a1971187bb384850a7d0006f81f24851@o1339101.ingest.sentry.io/4505495238868992",
});

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.');

  try {
    throw new Error("Test")
  } catch (e) {
    Sentry.captureException(e);
    await Sentry.flush(2000);
  }

  Sentry.captureMessage("Custom message");

  const name = (req.query.name || (req.body && req.body.name));
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  };

};

export default httpTrigger;