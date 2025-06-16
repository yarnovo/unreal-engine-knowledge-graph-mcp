# Unreal Engine Knowledge Graph MCP Server

English | [中文](README.md)

This project provides an MCP (Model Context Protocol) server for Unreal Engine official documentation, supporting **Neo4j graph database-based concept relationship search** to help developers discover learning paths and dependencies between concepts.

## Background

When learning Unreal Engine development, developers often need to understand relationships between various concepts, such as:
- The relationship between Blueprint System and C++ code
- The relationship between Material Editor and node-based programming
- The relationship between Nanite Virtual Geometry and high-polygon models

Traditional document search can only find information about individual concepts, unable to reveal learning paths and dependencies between concepts. This project builds a knowledge graph to help AI understand concept relationships and provide more intelligent learning guidance.

## Solution

This project provides an MCP server based on Neo4j graph database, specifically designed for intelligent search and discovery of Unreal Engine concept relationships. It uses DeepSeek v3 model to extract concept relationships from documents and build a complete knowledge graph.

## Features

- 🔗 **Concept Relationship Search**: Discover related concepts and learning paths for any concept
- 🧠 **Intelligent Concept Discovery**: Deep relationship mining based on graph database
- 🔍 **Concept Name Search**: Fuzzy search for concept names with bilingual Chinese-English support
- 📊 **Relationship Statistics**: Get concept relationship count statistics, sorted by importance

## Using in MCP Host

### Cursor Configuration

Create or edit `.cursor/mcp.json` configuration file in project root:

```json
{
    "mcpServers": {
        "unreal-engine-knowledge-graph-mcp": {
            "command": "npx",
            "args": [
                "-y",
                "unreal-engine-knowledge-graph-mcp"
            ],
            "env": {
                "NEO4J_URI": "bolt://localhost:7687",
                "NEO4J_USER": "neo4j",
                "NEO4J_PASSWORD": "password123"
            }
        }
    }
}
```

### VSCode Configuration

Create or edit `.vscode/mcp.json` configuration file in project root:

```json
{
    "servers": {
        "unreal-engine-knowledge-graph-mcp": {
            "type": "stdio",
            "command": "npx",
            "args": [
                "-y",
                "unreal-engine-knowledge-graph-mcp"
            ],
            "env": {
                "NEO4J_URI": "bolt://localhost:7687",
                "NEO4J_USER": "neo4j",
                "NEO4J_PASSWORD": "password123"
            }
        }
    }
}
```

### Environment Variables

| Environment Variable | Description | Default Value |
|---------------------|-------------|---------------|
| `NEO4J_URI` | Neo4j database connection address | `bolt://localhost:7687` |
| `NEO4J_USER` | Neo4j username | `neo4j` |
| `NEO4J_PASSWORD` | Neo4j password | `password123` |
| `DEEPSEEK_API_KEY` | DeepSeek API key | None |

## MCP Tool Functions

### search_concept_relations

Search related concepts and relationships for a specified concept with bilingual Chinese-English support.

**Use Cases:**
- 🎯 **Concept Learning Expansion**: "I want to learn about Blueprint System, what related concepts exist?"
- 🔍 **Technology Association Exploration**: "What core functional modules does Unreal Engine contain?"
- 🧭 **Learning Path Planning**: "Starting from Material Editor, what else should I learn?"

**Example Prompts:**
```
Help me search for "蓝图系统" and "Blueprint System" related concepts, I want to understand its relationships with other features
Find what core features "虚幻引擎" and "Unreal Engine" contain
Search for "材质编辑器" and "Material Editor" related learning content
```

**Parameters:**
- `concept` (required): The concept name to query (bilingual Chinese-English)
  - `cn` (required): Chinese concept name
  - `en` (required): English concept name
- `limit` (optional): Maximum number of relationships to return, default 20

**Return Data Format:**
```json
{
  "searchTerms": {
    "cn": "虚幻引擎",
    "en": "Unreal Engine"
  },
  "concept": "虚幻引擎 / Unreal Engine",
  "found": true,
  "totalRelations": 12,
  "relatedConcepts": [
    {
      "concept": "Blueprint System",
      "predicate": "contains",
      "context": "Visual scripting programming system of Unreal Engine",
      "direction": "outgoing"
    }
  ],
  "limit": 20
}
```

### search_concepts

Fuzzy search for concept names with bilingual Chinese-English support.

**Use Cases:**
- 🔍 **Quick Concept Lookup**: "I remember there was a 'particle' related feature, what was it called?"
- 📝 **Concept Name Confirmation**: "What 2D-related features exist in Unreal Engine?"
- 🎯 **Keyword Exploration**: "Search for all concepts containing 'editor'"

**Example Prompts:**
```
Search for all concepts containing "粒子" and "Particle"
Find features related to "2D"
Search for "编辑器" and "Editor" related tools
```

**Parameters:**
- `searchTerm` (required): Search keyword (bilingual Chinese-English)
  - `cn` (required): Chinese search keyword
  - `en` (required): English search keyword
- `limit` (optional): Maximum number of concepts to return, default 10

**Return Data Format:**
```json
{
  "searchTerms": {
    "cn": "蓝图",
    "en": "Blueprint"
  },
  "concepts": ["蓝图系统", "Blueprint System", "蓝图编辑器", "Blueprint Editor"],
  "count": 4,
  "limit": 10
}
```

### get_all_concepts

Get list of all available concepts with relationship statistics (sorted by relationship count, prioritizing core concepts).

**Use Cases:**
- 📋 **Core Concept Priority Browsing**: "What are the most important concepts in the Unreal Engine knowledge graph?"
- 🎯 **Learning Plan Development**: "I want to learn by importance order, which are the core concepts?"
- 📊 **Concept Relationship Analysis**: "How many associations do these concepts have, which are most central?"

**Example Prompts:**
```
Show the most important Unreal Engine concepts, sorted by relationship count
List the top 50 core concepts, I want to know which are most important
Get concept list with relationship statistics to help me plan my learning
```

**Parameters:**
- `limit` (optional): Maximum number of concepts to return, default 100

**Return Data Format:**
```json
{
  "concepts": [
    {
      "concept": "Blueprint System",
      "relationCount": 25,
      "incomingCount": 12,
      "outgoingCount": 13
    },
    {
      "concept": "Unreal Engine",
      "relationCount": 20,
      "incomingCount": 8,
      "outgoingCount": 12
    }
  ],
  "count": 2,
  "limit": 100,
  "note": "Concepts sorted by relationship count from high to low, including incoming, outgoing, and total relationship statistics"
}
```

## System Architecture

### Core Components

1. **Document Processing**: Read Markdown documents, extract concept relationships using DeepSeek v3
2. **Knowledge Graph**: Store concept and relationship data based on Neo4j
3. **MCP Service**: Provide standardized concept relationship query interface

### Data Flow

```
Markdown Documents → DeepSeek v3 Analysis → Concept Relationship Extraction → Neo4j Graph Database → MCP Tool Queries
```

## Development Testing

### Requirements

- Node.js >= 18.0.0
- Docker (for running Neo4j)
- DeepSeek API key

### Installation Steps

1. **Clone Project**
```bash
git clone https://github.com/your-username/unreal-engine-knowledge-graph-mcp.git
cd unreal-engine-knowledge-graph-mcp
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment Variables**
```bash
# Copy environment template
cp .env.example .env

# Edit .env file, add DeepSeek API key
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

4. **Start Neo4j Database**
```bash
# Start Docker container
docker-compose up -d

# Wait for database startup
npm run test-connection
```

5. **Build Project**
```bash
npm run build
```

6. **Extract Concept Relations (Test Mode)**
```bash
# Test mode: only process one document file
npm run extract-triplets:test-mode
```

7. **Import Data to Neo4j**
```bash
npm run import-to-neo4j
```

## Knowledge Triple Data Structure

The system uses standard knowledge graph triple structure to store concept relationships:

```json
{
  "filename": "document name",
  "sourceFile": "source file path",
  "triples": [
    {
      "subject": "subject concept",
      "predicate": "relationship predicate",
      "object": "object concept",
      "context": "context description",
      "direction": "bidirectional"
    }
  ],
  "timestamp": "creation timestamp"
}
```

**Field Descriptions:**
- `subject`: Subject concept name (subject of the knowledge triple)
- `predicate`: Relationship predicate (e.g., contains, supports, depends, associates)
- `object`: Object concept name (object of the knowledge triple)
- `context`: Context description to help understand the specific meaning of the relationship
- `direction`: Relationship directionality
  - `"unidirectional"`: One-way relationship (subject→object, but object doesn't necessarily→subject)
  - `"bidirectional"`: Two-way relationship (subject↔object, mutually associated)
- `confidence`: Confidence score (0.0-1.0) indicating relationship extraction accuracy and reliability
  - `0.9-1.0`: Clear technical relationships with direct, explicit documentation
  - `0.7-0.9`: Reasonably clear relationships inferred from context with sufficient evidence
  - `0.5-0.7`: Medium confidence, relationships exist but require some reasoning
  - `0.3-0.5`: Weak relationships, mainly based on semantic similarity
  - `0.1-0.3`: Very weak relationships, based only on concept co-occurrence

## Development Guide

### Project Structure

```
├── scripts/                    # Script files
│   ├── extract-triplets.ts     # Concept relationship extraction
│   ├── import-to-neo4j.ts      # Data import to Neo4j
│   └── test-connection.ts      # Database connection test
├── bin/                        # Source code
│   ├── index.ts                # MCP server implementation
│   └── neo4j-search.ts         # Neo4j search engine
├── sources/                    # Data files
│   ├── docs/                   # Markdown documents
│   └── triplets/               # Concept relationship JSON files
├── tests/                      # Test files
│   └── mcp-client.test.ts      # MCP client tests
├── docker-compose.yml          # Neo4j Docker configuration
└── package.json                # Project configuration
```

### Available Scripts

```bash
# Build project
npm run build

# Test database connection
npm run test-connection

# Generate demo data
npm run extract-triplets:test-mode

# Extract concept relationships (requires DeepSeek API)
npm run extract-triplets

# Import data to Neo4j
npm run import-to-neo4j

# Clear database and reimport
npm run import-to-neo4j -- --clear

# Run tests
npm test
```

### Adding New Documents

1. Place Markdown documents in `sources/docs/` directory
2. Run concept relationship extraction: `npm run extract-triplets`
3. Import to Neo4j: `npm run import-to-neo4j`

### Custom Concept Relationships

You can manually create concept relationship JSON files:

```json
{
  "filename": "custom-relations",
  "sourceFile": "custom/relations.md",
  "triples": [
    {
      "subject": "Custom Concept A",
      "predicate": "associates",
      "object": "Custom Concept B",
      "context": "This is a custom concept relationship",
      "direction": "bidirectional"
    }
  ],
  "timestamp": "2025-01-12T10:30:15.387Z"
}
```

Save the file to `sources/triplets/` directory, then run the import command.

## Technology Stack

### Core Technologies
- **Node.js**: Runtime environment
- **TypeScript**: Type-safe development language
- **MCP SDK**: Model Context Protocol implementation
- **Neo4j**: Graph database
- **Docker**: Containerized deployment

### AI Integration
- **DeepSeek v3**: Concept relationship extraction
- **OpenAI SDK**: API calling interface

### Development Tools
- **Vitest**: Unit testing framework
- **tsx**: TypeScript executor
- **Zod**: Parameter validation

## Troubleshooting

### Neo4j Connection Issues

```bash
# Check Docker container status
docker-compose ps

# View Neo4j logs
docker-compose logs neo4j

# Restart Neo4j container
docker-compose restart neo4j
```

### Test Connection
```bash
npm run test-connection
```

### View Neo4j Browser Interface
Visit http://localhost:7474
- Username: neo4j
- Password: password123

## License

MIT License

## Contributing

Issues and Pull Requests are welcome! 