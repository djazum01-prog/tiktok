#!/bin/bash

# TikTok App - Development Start Script (Linux/Mac)
# Starts the Express server and exposes it with ngrok for M-Pesa callback testing

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== TikTok App Development Server ===${NC}\n"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creating .env from .env.example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}Please edit .env with your M-Pesa credentials.${NC}"
fi

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo -e "${YELLOW}ngrok not found. Installing globally...${NC}"
    npm install -g ngrok
fi

echo -e "${GREEN}Starting Express server on port 3000...${NC}"
npm start &
SERVER_PID=$!
sleep 2

echo -e "${GREEN}Starting ngrok tunnel...${NC}"
NGROK_URL=$(ngrok http 3000 --log=stderr 2>&1 | grep -i "forwarding" | head -1 | awk '{print $NF}' | sed 's/http/https/')

if [ -z "$NGROK_URL" ]; then
    echo -e "${YELLOW}Ngrok started (check output above for tunnel URL)${NC}"
    echo -e "${YELLOW}Update MPESA_CALLBACK_URL in .env manually${NC}"
else
    echo -e "${GREEN}Ngrok tunnel URL: $NGROK_URL${NC}"
    echo -e "${GREEN}Update .env with:${NC}"
    echo -e "${GREEN}MPESA_CALLBACK_URL=$NGROK_URL/api/mpesa/callback${NC}"
fi

echo -e "\n${GREEN}✓ Server running at http://localhost:3000${NC}"
echo -e "${GREEN}✓ Open browser and navigate to the URL above${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop${NC}\n"

# Wait for both processes
wait $SERVER_PID
