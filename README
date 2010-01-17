Remotable
=========

An unobtrusive Javascript plugin for Rails 2.3, inspired by Rails 3.0

How to use
==========

Use `form_for`, `link_to` or 'button_to' as you normally would, passing the `:remote => true` option when you want the form or the link to be submitted using an XMLHttpRequest and the results of the request evaled in the context of the page.

What it does
============

* Overrides `form_for`, `remote_form_for`, `link_to`, `remote_link_to`, and `button_to` so that they emit HTML5-like tags with `data-remote` and `data-method` attributes instead of the current inline javascript style.

* Provides a jQuery 1.4 backed library that transparently takes care of launching an AJAX request for any link or form with the `data-*` attributes

What it doesn't do
==================

* It doesn't support any of the `:update => { :success => "posts", :failure => "error" }` style options. You have to use RJS, or just pure javascript, in your response in order to manipulate any HTML elements on the page.

* It only accepts `GET` as a `:method` for `link_to`. If you need an element that looks like a link but updates or destroys a resource, the use `button_to` and style the button with CSS to look like a link.

Supporting other libraries
==========================

It should be trivial to write your own `remotable.js` and drop it in as a replacement for `javascripts/remotable.js`

The following gists provide a sample implementation for Prototype 1.6 and jQuery 1.3.2 (with livequery)

Todo
====

Copyright (c) 2010 Christos Zisopoulos, released under the MIT license
