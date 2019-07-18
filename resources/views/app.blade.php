<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>React app</title>
        <meta name="description" content="React app">

        <link rel="stylesheet" href="{{ asset('css/app.css') }}">


        <script src="{{ asset('js/app.js') }}" charset="utf-8" defer></script>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
