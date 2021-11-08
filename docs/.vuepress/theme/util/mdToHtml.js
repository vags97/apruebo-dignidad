import showdown from 'showdown';

export default function(text){
    var converter = new showdown.Converter();
    return converter.makeHtml(text);
}
