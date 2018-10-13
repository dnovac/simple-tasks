class StaticUtils {
    static loadTaskColors() {
        return [
            '#f1c40f',
            '#f8a5c2',
            '#81ecec',
            '#58B19F',
            '#f3a683',
            '#D6A2E8',
            '#f7d794',
            '#dfe6e9',
            '#f78fb3',
            '#a29bfe',
            '#f19066',
            '#596275',
            '#c44569',
            '#b8e994',
            '#f8c291',
            '#81ecec',
            '#ffeaa7',
            '#f1c40f',
            '#f8a5c2',
            '#81ecec',
            '#58B19F',
            '#f3a683',
            '#D6A2E8',
            '#f7d794',
            '#dfe6e9',
            '#f78fb3',
            '#a29bfe',
            '#f19066',
            '#596275',
            '#c44569',
            '#b8e994',
            '#f8c291',
            '#81ecec',
            '#ffeaa7'
        ];
    }

    static hexToRgbA = (hex, opacity) => {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return (
                'rgba(' +
                [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
                `,${opacity})`
            );
        }
        throw new Error('Bad Hex');
    };

    static isEmpty = obj => {
        return Object.keys(obj).length === 0;
    };

    static loadSamples = () => {
        return {
            'task-0': {
                name: 'Boiling Pasta',
                time: '8'
            },
            'task-1': {
                name: 'Brush Teeth',
                time: '3'
            },
            'task-2': {
                name: 'Boiling Egg',
                time: '5'
            },
            'task-3': {
                name: 'Pet Cat',
                time: '5'
            },
            'task-4': {
                name: 'Learn something new',
                time: '15'
            },
            'task-5': {
                name: 'Making Tea',
                time: '7'
            },
            'task-6': {
                name: 'Smile 😃',
                time: '2'
            }
        };
    };
}

export default StaticUtils;
