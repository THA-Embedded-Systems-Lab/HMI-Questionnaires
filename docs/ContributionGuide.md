# Contribution Guide

We separate the guide in two use cases: (i) updating existing questionnaire data
and (ii) adding new questionnaires.

## Updating Questionnaire Data

If you find any inaccuracies or outdated information in the existing
questionnaires, please follow these steps to submit your updates:

1. Go to the [`src/questionnaires.ts`](./src/questionnaires.ts) file in the
   repository.
2. Locate the questionnaire that needs updating.
3. Make the necessary changes to the questionnaire data. Ensure that you follow
   the existing structure and format used in the file. In case the structure is
   missing some fields, please compare to the section below to identify missing
   fields for the complete structure.
4. Once you have made the changes, commit them with a descriptive message
   explaining the updates you made.
5. Push your changes to your forked repository.
6. Open a pull request to the main repository, providing a clear description of
   the changes you have made.
7. A reviewer will assess your pull request and may provide feedback or request
   changes before merging it into the main repository.

## Adding New Questionnaires

If you are missing a questionnaire in the collection, please check the
[issues](https://github.com/THA-Embedded-Systems-Lab/HMI-Questionnaires/issues)
in case someone already requested it or if there is an ongoing discussion about
it. If not, feel free to open a new issue or directly submit a pull request with
the details of the questionnaire.

In order to add a new questionnaire, please follow these steps:

1. Go to the [`src/questionnaires.ts`](./src/questionnaires.ts) file in the
   repository.
2. Add a new entry for the questionnaire following the existing structure and
   format used in the file. An example structure is provided below, for copy and
   pasting. Append this to the end of the
   ['questionnaires' array](./src/questionnaires.ts).
3. Fill in all the relevant details for the new questionnaire, ensuring accuracy
   and completeness. You may utilize LLMs to fill in the extracted details in
   the data structure, but please make sure to verify the information for
   correctness.
4. Once you have added the new questionnaire, commit your changes with a
   descriptive message explaining the addition.
5. Push your changes to your forked repository.
6. Open a pull request to the main repository, providing a clear description of
   the new questionnaire you have added.
7. A reviewer will assess your pull request and may provide feedback or request
   changes before merging it into the main repository.

The following code block provides a skeleton to add to the
[`src/questionnaires.ts`](./src/questionnaires.ts) file. For possible values for
the individual fields, please refer to the existing entries in the file, or
check the definitions in [types](./src/types/). You can also refer to the
existing questionnaires as examples.

```json
{
  name: "" , // Full name of the questionnaire
  short: "", // Short name or acronym
  data: [
    // This is for the validation data of the questionnaire for specific languages.
    {
      language: "", // 2 character language code, e.g., en
      participantDetails: {
        // Details about the participants on which the questionnaire was validated
        n: 0, // Number of participants
        type: [] // Type of participants, e.g., "students", "employees", etc.
      },
      scales: [
        {
          name:  "",  // Name of the scale/subscale
          cronbachsAlpha: null // Cronbach's alpha value for the scale, leave null if not available
        },
        {
          name: "", // Name of the next scale; Copy this block for additional scales
          cronbachsAlpha: null // ...
        }
      ]
    }
  ],
  license: , // License under which the questionnaire is published, leave empty if not available
  metadata: {
    responseFormat: null, // e.g., Likert scale, yes/no, semantic differential, etc., see src/types/ResponseFormat.ts
    time: [], // Relative time to administer the questionnaire to real experiments, e.g. Time.PreStudy, Time.Standalone (without experiment), Time.PostStudy, multiple values possible
    year: null, // Year of publication
    items: null, // Number of items/questions
    languages: [""] // List of available languages in 2 character code, e.g., "en", "de"
  },
  links: {
    doi: "", // DOI link if available
    website: "", // Official website link if available
  },
  domain: [], // Domains of application, e.g., automotive, aviation, general, etc.
  notes: [] // Any additional notes, e.g. average of multiple Cronbach's alpha values for a single scale across multiple groups
}
```
