import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.filter((question: Question) => question.published);
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    return questions.filter(
        (question: Question) =>
            question.body !== "" ||
            question.expected !== "" ||
            question.options.length >= 1,
    );
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    const foundQuestion: Question | undefined = questions.find(
        (question: Question) => question.id === id,
    );
    return foundQuestion !== undefined ? foundQuestion : null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter((question: Question) => question.id !== id);
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.map((value: Question) => value.name);
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    return questions.reduce(
        (previousPoints: number, { points: currentPoints }) =>
            previousPoints + currentPoints,
        0,
    );
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    return questions.reduce(
        (
            previousPoints: number,
            { points: currentPoints, published }: Question,
        ) => (published ? previousPoints + currentPoints : previousPoints),
        0,
    );
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let csvQuestions: string = questions.reduce(
        (
            previousCSV: string,
            { id, name, options, points, published }: Question,
        ) => {
            return `${previousCSV}\n${id},${name},${options.length},${points},${published}`;
        },
        "id,name,options,points,published",
    );
    return csvQuestions;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    return questions.map((question: Question) => {
        return {
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false,
        };
    });
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    return questions.map((question: Question) => {
        return {
            ...question,
            options: [...question.options],
            published: true,
        };
    });
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    let firstQuestionType: QuestionType | null = null;
    return questions.every(({ type }: Question) => {
        if (firstQuestionType === null) {
            firstQuestionType = type;
            return true;
        }

        return type === firstQuestionType;
    });
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    let copyQuestions: Question[] = questions.map((question: Question) => ({
        ...question,
        options: [...question.options],
    }));
    return [...copyQuestions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    return questions.map((question: Question) => ({
        ...question,
        options: [...question.options],
        name: targetId === question.id ? newName : question.name,
    }));
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    return questions.map((question: Question) => ({
        ...question,
        type: targetId === question.id ? newQuestionType : question.type,
        options:
            (
                targetId === question.id &&
                newQuestionType !== "multiple_choice_question"
            ) ?
                []
            :   [...question.options],
    }));
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
function addOrReplaceOption(
    targetOptionIndex: number,
    options: string[],
    newOption: string,
): string[] {
    if (targetOptionIndex === -1) {
        return [...options, newOption];
    }

    const copyOptions = [...options];
    // Replaces the element at the index targetOptionIndex by deleting the element
    // at that position and inserting the new one
    copyOptions.splice(targetOptionIndex, 1, newOption);
    return copyOptions;
}

export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    return questions.map((question: Question) => ({
        ...question,
        options:
            question.id === targetId ?
                addOrReplaceOption(
                    targetOptionIndex,
                    question.options,
                    newOption,
                )
            :   [...question.options],
    }));
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    let copyQuestions: Question[] = questions.map((question: Question) => ({
        ...question,
        options: [...question.options],
    }));

    const findQuestionIndex: number = copyQuestions.findIndex(
        (question: Question) => question.id === targetId,
    );

    if (findQuestionIndex === -1) {
        return copyQuestions;
    }

    copyQuestions.splice(
        findQuestionIndex + 1,
        0,
        duplicateQuestion(newId, copyQuestions.at(findQuestionIndex)!),
    );

    return copyQuestions;
}
