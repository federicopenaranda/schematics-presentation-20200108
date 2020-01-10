export class <%= classify(name) %> {
    <% for ( let i=0; i<fields2.length; i++ ) { %><%= fields2[i].name %>: <%= fields2[i].type %>;
    <% } %>
}
