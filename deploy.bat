@echo off
title Cloudflare Pages Deployment
cd /d "c:\Users\live\Downloads\EVENT Ticket pro"
powershell -NoProfile -ExecutionPolicy Bypass -File "deploy.ps1"
