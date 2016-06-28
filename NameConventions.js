var NamedConventions = {
    firstLetterBig: function firstLetterBig(name) {
        var splitted = name.split('');
        splitted[0] = splitted[0].toUpperCase();
        return splitted.join('');
    },

    spacedWords: function spacedWords(name) {
        var hasDash = !!~name.indexOf('-');

        if ( hasDash ) {
            var splittedWords = name.split('-');
            var joinedWords = '';

            for (var i = 0; i < splittedWords.length; i++) {
                joinedWords += this.firstLetterBig(splittedWords[i]) + ' ';
            }
            return joinedWords.trim()
        }

        return this.firstLetterBig(name);
    },

    camelCased: function camelCased(name) {
        var hasDash = !!~name.indexOf('-');

        if ( hasDash ) {
            var splittedWords = name.split('-');
            var joinedWords = '';

            for (var i = 0; i < splittedWords.length; i++) {
                joinedWords += this.firstLetterBig(splittedWords[i]);
            }

            return joinedWords;
        }

        return this.firstLetterBig(name);
    }
}

module.exports = NamedConventions;