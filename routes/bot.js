const express = require('express');
const router = express.Router();
const cors = require('cors');
const {WebhookClient} = require('dialogflow-fulfillment');
const dialogflow = require('dialogflow');
const Manager = require('../corona/sessionManager');

const languageCode = 'de'
const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionClient = new dialogflow.SessionsClient();
const sessionManager = new Manager();


  const detectIntent = async (
    projectId,
    sessionId,
    query,
    contexts,
    languageCode
  ) => {
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode,
        },
      },
    };

    if (contexts && contexts.length > 0) {
      request.queryParams = {
        contexts: contexts,
      };
    }

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
  }

 router.post('/getAnswer', cors(), async function(req, res, next) {
    response = await detectIntent(projectId,req.body.sessionSid,req.body.question,null,languageCode);
    let escalateAgent = response.queryResult.intent.displayName == 'Escalate';
    for(var element of (response.queryResult.outputContexts||{})) {
      if(element.parameters  && element.parameters.fields && element.parameters.fields.escalate ) {
        escalateAgent = true;
      }
    }

    let endConversation = response.queryResult.diagnosticInfo && response.queryResult.diagnosticInfo.fields.end_conversation ? response.queryResult.diagnosticInfo.fields.end_conversation.boolValue : false
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({response: response.queryResult.fulfillmentText, endConversation, escalateAgent, session: req.body.sessionSid }));
});


function handleAgent(agent) {
  try{
    const QUESTIONNAIRE_INTENT = 'request_questionnaire';
    const QUESTIONNAIRE_ANSWER_INTENT = 'questionnaire_answer';
    const intent = agent.intent;
    var question;
    let session = sessionManager.getSession(agent.session);
    
    switch (intent) {
      case QUESTIONNAIRE_INTENT:
        question = session.getQuestion();
        agent.add(question.output);
        agent.context.set(question.context);
        break;
      case QUESTIONNAIRE_ANSWER_INTENT:
        let contextParameters = agent.contexts.find(element => element.name == QUESTIONNAIRE_ANSWER_INTENT).parameters;
        session.answerQuestion(agent.parameters, contextParameters);
        question = session.getQuestion();
        agent.add(question.output);
        agent.context.set(question.context);
        if(question.endConversation) {
          agent.endConversation
        }
        break;
    }
  } catch (e) {
    console.log(e)
  }
}

router.post('/fulfillment', cors(), function(req, res, next) {
  const agent = new WebhookClient({request: req, response: res});
  agent.handleRequest(handleAgent);
});

router.get('/session/:identifier', cors(), function(req, res, next) {
  res.end(JSON.stringify({answers : sessionManager.getSession([`projects/${process.env.DIALOGFLOW_PROJECT_ID}/agent/sessions/${req.params.identifier}`]).answers}));
});

module.exports = router;