
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Palette, 
  Database, 
  Terminal, 
  FileCode, 
  Zap,
  Key,
  Search
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'formatter' | 'tester' | 'generator' | 'analyzer';
  color: string;
}

const tools: Tool[] = [
  {
    id: '1',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    icon: FileCode,
    category: 'formatter',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'API Tester',
    description: 'Test REST APIs and webhooks',
    icon: Zap,
    category: 'tester',
    color: 'bg-green-500'
  },
  {
    id: '3',
    name: 'Color Picker',
    description: 'Pick and generate color palettes',
    icon: Palette,
    category: 'generator',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    name: 'JWT Decoder',
    description: 'Decode and verify JWT tokens',
    icon: Key,
    category: 'analyzer',
    color: 'bg-orange-500'
  },
  {
    id: '5',
    name: 'Regex Tester',
    description: 'Test regular expressions',
    icon: Search,
    category: 'tester',
    color: 'bg-red-500'
  },
  {
    id: '6',
    name: 'SQL Builder',
    description: 'Build SQL queries visually',
    icon: Database,
    category: 'generator',
    color: 'bg-indigo-500'
  }
];

const DevToolsWidget = () => {
  return (
    <Card className="dev-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Developer Tools
        </CardTitle>
        <Button size="sm" variant="outline">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <div
                key={tool.id}
                className="bg-muted/30 rounded-lg p-4 hover-lift cursor-pointer group border border-transparent hover:border-primary/20 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Quick Action</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Launch terminal-style command palette for instant access to all tools
          </p>
          <Button size="sm" className="w-full">
            Open Command Palette (⌘K)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevToolsWidget;
