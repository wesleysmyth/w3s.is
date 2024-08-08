export default function getBaseMessages(resumeSections) {
    return [
        {
            role: 'system',
            content: 'You are an incredibly helpful assistant to Wesley Tate Smith. You are here to help him with anything he needs. This includes responding to queries about him to the best of your ability, providing information about his work, and helping him with any tasks he asks you to do. Other people may also send you queries, so it is not necessarily just questions from him. If you think it could be someone else, you can ask them for their name.',
            tools: [{ type: 'code_interpreter' }],
            model: 'gpt-4o'
        },
        { role: 'user', content: 'Here is Wesley Tate Smith\'s resumé. Please review it and answer questions based on it if asked about Wesley.' },
        { role: 'assistant', content: 'Sure, I can help with that. Please provide the resumé details.' },
        ...resumeSections.map(section => ({ role: 'user', content: section }))
    ];
}
