
import { useState } from "react";
import { Terminal, Code, Database, Shield, Zap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";

const DevTools = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');

  const tools = [
    {
      id: "json",
      name: "JSON Formatter",
      description: "Format and validate JSON data",
      icon: Code,
      category: "Utilities"
    },
    {
      id: "base64",
      name: "Base64 Encoder/Decoder",
      description: "Encode and decode Base64 strings",
      icon: Shield,
      category: "Encoding"
    },
    {
      id: "hash",
      name: "Hash Generator",
      description: "Generate MD5, SHA1, SHA256 hashes",
      icon: Zap,
      category: "Security"
    },
    {
      id: "sql",
      name: "SQL Formatter",
      description: "Format and beautify SQL queries",
      icon: Database,
      category: "Database"
    }
  ];

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (error) {
      setJsonOutput('Invalid JSON format');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed));
    } catch (error) {
      setJsonOutput('Invalid JSON format');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Developer Tools</h1>
            <p className="text-gray-600">Essential tools for development tasks</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>

        <Tabs defaultValue="tools" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tools">All Tools</TabsTrigger>
            <TabsTrigger value="json">JSON Tools</TabsTrigger>
            <TabsTrigger value="encoding">Encoding Tools</TabsTrigger>
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <tool.icon className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </div>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {tool.category}
                      </span>
                      <Button size="sm" variant="outline">
                        Open Tool
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="json" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  JSON Formatter & Validator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Input JSON</label>
                    <Textarea
                      placeholder="Paste your JSON here..."
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      className="min-h-[200px] font-mono text-sm"
                    />
                    <div className="flex gap-2">
                      <Button onClick={formatJson} size="sm">
                        Format
                      </Button>
                      <Button onClick={minifyJson} size="sm" variant="outline">
                        Minify
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Output</label>
                    <Textarea
                      value={jsonOutput}
                      readOnly
                      className="min-h-[200px] font-mono text-sm bg-gray-50"
                    />
                    <Button size="sm" variant="outline" className="w-full">
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="encoding" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Base64 Encoder/Decoder
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Input Text</label>
                    <Textarea placeholder="Enter text to encode/decode..." className="min-h-[100px]" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Encode</Button>
                    <Button size="sm" variant="outline">Decode</Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Output</label>
                    <Textarea readOnly className="min-h-[100px] bg-gray-50" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Hash Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Input Text</label>
                    <Input placeholder="Enter text to hash..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">MD5</label>
                    <Input readOnly className="bg-gray-50 font-mono text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SHA256</label>
                    <Input readOnly className="bg-gray-50 font-mono text-sm" />
                  </div>
                  <Button size="sm" className="w-full">Generate Hashes</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="terminal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Web Terminal (Simulation)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-[300px]">
                  <div className="mb-2">Welcome to Madi7i Dev Pro Terminal</div>
                  <div className="mb-2">Type 'help' for available commands</div>
                  <div className="mb-4">─────────────────────────────────────</div>
                  <div className="flex items-center">
                    <span className="text-blue-400">user@madi7i:~$</span>
                    <Input 
                      className="ml-2 bg-transparent border-none text-green-400 font-mono focus:ring-0 p-0"
                      placeholder="Enter command..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DevTools;
