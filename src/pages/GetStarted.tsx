
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/auth/AuthModal";
import { Rocket, Database, Shield, Zap } from "lucide-react";

const GetStarted = () => {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (user) {
    // Redirect to main app if user is logged in
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-400 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-1xl">Dev Pro</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Arsani-Tech <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dev Pro</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your complete developer workspace powered by Firebase. Manage projects, track progress, and collaborate seamlessly.
          </p>
          <Button 
            onClick={() => setAuthModalOpen(true)} 
            size="lg" 
            className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Get Started Free
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Real-time Database</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Everything synced instantly with Firebase Realtime Database</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Secure Auth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Firebase Authentication with multiple providers</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Project Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Track and manage your development projects</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Built with modern React and optimized for speed</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to get started?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-100 mb-6">Join thousands of developers using Arsani-Tech Dev Pro</p>
              <Button 
                onClick={() => setAuthModalOpen(true)} 
                size="lg" 
                variant="secondary" 
                className="bg-white text-blue-600 hover:bg-gray-50"
              >
                Start Building Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default GetStarted;
