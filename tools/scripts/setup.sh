#!/bin/bash

# Setup Script for Xquads AIOS Squads Project
# This script sets up the development environment

set -e

echo "=== Xquads AIOS Squads Setup ==="
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "Error: Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "Node.js version: $(node -v) - OK"

# Install dependencies
echo "Installing dependencies..."
npm install

# Create necessary directories
echo "Creating directories..."
mkdir -p logs
mkdir -p temp
mkdir -p uploads

# Copy environment file
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "Please edit .env file with your configuration."
fi

# Run type check
echo "Running TypeScript type check..."
npm run typecheck

# Run linting
echo "Running ESLint..."
npm run lint

# Run tests
echo "Running tests..."
npm test

echo
echo "=== Setup Complete ==="
echo "Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000 to see the application"
