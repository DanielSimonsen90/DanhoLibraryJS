const library = require('./dist');

const testElement = document.createProperElement('div', {
    classes: ['test-elements'],
    attributes: [],
    children: [
        document.createProperElement('h1', { children: 'Hello there' }),
        document.createProperElement('label', {
            children: [
                'Test Element',
                document.createProperElement('input', {
                    attributes: [['type', 'test'], ['placeholder', 'Test me here maybe? uwu']]
                })
            ]
        }),
        document.createProperElement('button', {
            events: [library.HTMLEvent('click', e => console.log('clicked!'))]
        })
    ]
})