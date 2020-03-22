const { QUESTIONS, HEALTH_QUESTIONS } = require('./questions')
class Session {
    constructor() {
        this.answers = {verbatimAnswers: {}, riskCategories: {}}
        this.questionIndex = 0;
        this.agentParameters;
        this.contextParameters;
        this.healthQuestions = false;
    }

    get questionArray() {
        return this.healthQuestions ? HEALTH_QUESTIONS : QUESTIONS;
    }

    answerQuestion(agentParameters, contextParameters) {
        this.agentParameters = agentParameters;
        this.contextParameters = contextParameters;

        // Determine question
        let question = this.questionArray[this.questionIndex].loquestion;
        // Store answer
        this.answers.verbatimAnswers[question] = agentParameters.janein;
        // Update risk category
        this.updateRiskCategory();

        //increase index
        this.questionIndex = this.questionIndex + 1;
        console.log(this);
    }

    updateRiskCategory() {
        if((this.agentParameters||{}).janein == 'ja') {
            // Determine risk category
            let riskCategory = this.questionArray[this.questionIndex].category;
            this.answers.riskCategories[riskCategory] = true;
        }
    }

    getQuestion() {
        let question = {output: null, context: null, endConversation: false};    
        // Determine if flow is over
        let endOfQuestionArray = this.questionArray.length == this.questionIndex;
        let jumpToDiagnosisForQuestion = (this.questionArray[this.questionIndex-1]||{}).jumptodiagnosisifyes && (this.agentParameters||{}).janein == 'ja';
        let jumpToDiagnosisForFlow= endOfQuestionArray && !this.healthQuestions;
        let escalateToAgent = endOfQuestionArray && this.healthQuestions;

        if(escalateToAgent) {
            question.output = 'Vielen Dank, wir verbinden Sie mit einem unserer Ansprechpartner.';
            question.context = {name: 'escalate_confirm', lifespan: 1, parameters: {escalate: true}};
            question.endConversation = true;
        } else if (jumpToDiagnosisForFlow || jumpToDiagnosisForQuestion) {
            question.output = this.diagnose();
            this.healthQuestions = true;
            question.context = {name: 'questionnaire_answer', lifespan: 1, parameters: {'questionIndex': this.questionIndex}};
        } else {
            question.output= (this.questionArray[this.questionIndex].question);
            question.context = {name: 'questionnaire_answer', lifespan: 1, parameters: {'questionIndex': this.questionIndex}};
        }
     
        return question;
    }

    diagnose() {
        // After diagnosis, reset question index - TODO: Update to not have implicit logic here
        this.questionIndex = 0;
        if(this.answers.riskCategories.contact_diagnosis_severe || (this.answers.riskCategories.contact_diagnosis_mild && this.answers.riskCategories.symptoms)) {
            this.answers.diagnosis = 'wahrscheinlich';
            return `Bei Ihnen besteht ein begründeter Verdacht auf eine Infektion mit dem neuartigen Coronavirus. Bevor wir Sie an einen Ansprechpartner vermitteln, bitten wir Sie, noch weitere Fragen zu beantworten. ${HEALTH_QUESTIONS[0].question}`;
          } else if( this.answers.riskCategories.symptoms ) {
            this.answers.diagnosis = 'möglich';
            return 'Bleiben Sie bitte daheim und beachten Sie bitte die vorgeschlagenen Maßnahmen zur Vorbeugung. Bei Verschlechterung des Gesundheitszustandes melden Sie sich bitte wegen einer differenzialdiagnostischen Abklärung bei Ihrem Hausarzt oder hier.';
            
          } else {
            this.answers.diagnosis = 'unwahrscheinlich';
            return 'Es gibt keine deutlichen Hinweise auf eine Infektion mit dem neuartigen Coronavirus. Bitte bleiben Sie trotzdem weiterhin aufmerksam und beachten Sie bitte unsere Hinweise zur Vorbeugung.';
          }
    }

}

module.exports = Session