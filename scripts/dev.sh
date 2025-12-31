#!/bin/bash
# RowCast Development Server Startup Script

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🚣 Starting RowCast Development Environment"
echo "============================================"

# Check for Redis
if ! command -v redis-cli &> /dev/null; then
    echo "⚠️  Redis not found. Please install Redis first."
    exit 1
fi

# Check if Redis is running
if ! redis-cli ping &> /dev/null; then
    echo "📦 Starting Redis server..."
    redis-server --daemonize yes
    sleep 1
fi

echo "✅ Redis is running"

# Check for Python virtual environment
if [ ! -d "$PROJECT_ROOT/backend/venv" ]; then
    echo "📦 Creating Python virtual environment..."
    cd "$PROJECT_ROOT/backend"
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
else
    source "$PROJECT_ROOT/backend/venv/bin/activate"
fi

echo "✅ Python environment ready"

# Check for Node modules
if [ ! -d "$PROJECT_ROOT/frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd "$PROJECT_ROOT/frontend"
    npm install
fi

echo "✅ Frontend dependencies ready"

# Start both servers
echo ""
echo "🚀 Starting servers..."
echo "   Backend:  http://localhost:5000"
echo "   Frontend: http://localhost:3000"
echo "   Dashboard: http://localhost:5000/dashboard"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

cd "$PROJECT_ROOT"
npm run dev
