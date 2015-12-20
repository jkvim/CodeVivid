var React = require('react');
var render = require('react-dom').render;
var NavBar = require('./public/src/js/component/navbar.jsx');
var Pagination = require('./public/src/js/component/pagination.jsx');
var Footer = require('./public/src/js/component/footer.jsx');
require('./public/src/css/style.css');

var navbar = document.getElementById('navbar');
var pagination = document.getElementById('pagination');
var footer = document.getElementById('footer');

render(<NavBar session='' />, navbar);
render(<Pagination page={1}/>, pagination);
render(<Footer />, footer)

