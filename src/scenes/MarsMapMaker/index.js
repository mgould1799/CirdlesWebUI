// @flow
import React, { Component } from 'react';
import Radium from 'radium';


import express from "express";

let app: *;
app = express();
const targetBaseUrl = 'http://localhost:3000';

const handleRedirect = (req, res) => {
  const targetUrl = targetBaseUrl + req.originalUrl;
  res.redirect(targetUrl);
};

app.get('*', handleRedirect);

const port = process.env.port || 5000;
app.listen(port);