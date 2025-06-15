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
- 🎯 **Relationship Type Queries**: Search concept relationships by type (e.g., contains, supports, depends)
- 🧠 **Intelligent Concept Discovery**: Deep relationship mining based on graph database
- 📊 **Knowledge Graph Statistics**: Real-time statistics of graph database
- 🔍 **Concept Name Search**: Fuzzy search for concept names with Chinese support

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

Search related concepts and relationships for a specified concept.

**Use Cases:**
- 🎯 **Concept Learning Expansion**: "I want to learn about Blueprint System, what related concepts exist?"
- 🔍 **Technology Association Exploration**: "What core functional modules does Unreal Engine contain?"
- 🧭 **Learning Path Planning**: "Starting from Material Editor, what else should I learn?"

**Example Prompts:**
```
Help me search for "Blueprint System" related concepts, I want to understand its relationships with other features
Find what core features "Unreal Engine" contains
Search for "Material Editor" related learning content
```

**Parameters:**
- `concept` (required): The concept name to query
- `limit` (optional): Maximum number of relationships to return, default 20

**Return Data Format:**
```json
{
  "concept": "Unreal Engine",
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

Fuzzy search for concept names.

**Use Cases:**
- 🔍 **Quick Concept Lookup**: "I remember there was a 'particle' related feature, what was it called?"
- 📝 **Concept Name Confirmation**: "What 2D-related features exist in Unreal Engine?"
- 🎯 **Keyword Exploration**: "Search for all concepts containing 'editor'"

**Example Prompts:**
```
Search for all concepts containing "particle"
Find features related to "2D"
Search for "editor" related tools
```

**Parameters:**
- `searchTerm` (required): Search keyword
- `limit` (optional): Maximum number of concepts to return, default 10

**Return Data Format:**
```json
{
  "searchTerm": "Blueprint",
  "concepts": ["Blueprint System", "Blueprint Editor"],
  "count": 2,
  "limit": 10
}
```

### get_all_concepts

Get list of all available concepts.

**Parameters:**
- `limit` (optional): Maximum number of concepts to return, default 100

### search_by_predicate

Search knowledge triples by relationship predicate.

**Parameters:**
- `predicate` (required): Relationship predicate (e.g., contains, supports, depends)
- `limit` (optional): Maximum number of triples to return, default 20

**Return Data Format:**
```json
{
  "predicate": "supports",
  "triples": [
    {
      "subject": "Blueprint System",
      "predicate": "supports",
      "object": "Event-Driven Programming",
      "context": "Blueprints can respond to various game events",
      "direction": "unidirectional",
      "confidence": 0.85
    }
  ],
  "count": 5,
  "totalCount": 15,
  "limit": 20
}
```

### search_by_confidence

Search knowledge triples by confidence score, returning high-quality concept relationships.

**Use Cases:**
- ⭐ **High-Quality Relationship Filtering**: "Give me the most reliable concept relationships with high confidence"
- 🎯 **Precise Learning Content**: "I only want to see core relationships with confidence above 0.8"
- 📚 **Premium Resource Priority**: "Filter out the most trustworthy learning materials"

**Example Prompts:**
```
Show high-quality relationships with confidence above 0.9
Find core concept relationships with confidence greater than 0.8
Filter the most reliable learning content with high confidence
```

**Parameters:**
- `minConfidence` (optional): Minimum confidence threshold (0.0-1.0), default 0.5
- `limit` (optional): Maximum number of triples to return, default 20

**Return Data Format:**
```json
{
  "minConfidence": 0.7,
  "triples": [
    {
      "subject": "Unreal Engine",
      "predicate": "contains",
      "object": "Blueprint System",
      "context": "Built-in visual scripting system of Unreal Engine",
      "direction": "unidirectional",
      "confidence": 0.95
    }
  ],
  "count": 8,
  "totalCount": 25,
  "limit": 20
}
```

### get_confidence_stats

Get confidence statistics from the knowledge graph.

**Return Data Format:**
```json
{
  "confidenceStats": {
    "avgConfidence": 0.742,
    "highConfidenceCount": 45,
    "mediumConfidenceCount": 38,
    "lowConfidenceCount": 12,
    "confidenceDistribution": [
      {"range": "0.9-1.0", "count": 15},
      {"range": "0.8-0.9", "count": 30},
      {"range": "0.7-0.8", "count": 25},
      {"range": "0.6-0.7", "count": 13},
      {"range": "0.5-0.6", "count": 10},
      {"range": "0.0-0.5", "count": 2}
    ]
  },
  "neo4jAvailable": true
}
```

### get_knowledge_graph_stats

Get knowledge graph statistics.

**Return Data Format:**
```json
{
  "statistics": {
    "entityCount": 14,
    "documentCount": 1,
    "tripleCount": 12,
    "predicateTypes": [
      {"predicate": "supports", "count": 3},
      {"predicate": "contains", "count": 2}
    ]
  },
  "neo4jAvailable": true
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
├── src/                        # Source code
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
  "relations": [
    {
      "conceptA": "Custom Concept A",
      "relation": "associates",
      "conceptB": "Custom Concept B",
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