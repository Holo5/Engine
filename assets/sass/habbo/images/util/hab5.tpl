.h5 {
    background: url('habbo/images/<%= options.spritePath %>');
    font-style: normal;

<% layout.images.forEach(function (image) { %>
    &.<%= image.className %> {
        background-position: <%= getCSSValue(-image.x) %> <%= getCSSValue(-image.y) %>;
        width: <%= getCSSValue(image.width) %>;
        height: <%= getCSSValue(image.height) %>;
    }
<% }); %>
}