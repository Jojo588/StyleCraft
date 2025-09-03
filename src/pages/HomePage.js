// src/pages/HomePage.js
import React from "react";
import kenteOutfit from '../components/images/9081291f584c6b55c752e789c5533de8.jpg'
import {Link} from 'react-router-dom';
import { Palette, Shirt, Share2, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section id="home" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                Unleash Your Style. <span className="text-primary text-teal-500">Design the Future</span> of Fashion.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Create outfits that express your personality with our interactive mannequin and fashion customizer.
                Mix colors, patterns, and styles to craft your unique look.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to='/fashion-customizer'>
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg text-lg bg-teal-500 hover:bg-teal-700 duration-300">
                  Start Customizing
                </Button>
                </Link>
                
                <Button className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg text-lg bg-transparent border-teal-500 text-teal-500 hover:bg-teal-700 duration-300">
                  <Link
                  to='/about'>
                  Learn More
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
            <img
              src={kenteOutfit}
              alt="Interactive Fashion Mannequin"
              className="w-full  object-cover rounded-2xl"
            />
          </div>

            </div>
          </div>
        </div>
      </section>

      {/* About Section Preview */}
      <section id="about" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Why Choose Our Fashion Customizer?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Select outfits, experiment with colors & patterns, preview designs instantly, and save & share your
              creations. Our intuitive platform makes fashion design accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature Card */}
            <div className="text-center p-6 hover:shadow-lg transition-shadow border rounded-xl bg-gray-100">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto bg-gray-200">
                  <Sparkles className="w-8 h-8 text-primary text-teal-500 " />
                </div>
                <h3 className="text-xl font-serif font-bold">Interactive Mannequin</h3>
                <p className="text-muted-foreground">See your designs come to life with our 3D interactive mannequin.</p>
              </div>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow border rounded-xl bg-gray-100">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto bg-yellow-100">
                  <Palette className="w-8 h-8 text-accent text-yellow-600 " />
                </div>
                <h3 className="text-xl font-serif font-bold">Unlimited Colors & Patterns</h3>
                <p className="text-muted-foreground">Choose from a wide palette or upload your own custom designs.</p>
              </div>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow border rounded-xl bg-gray-100">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto bg-gray-200">
                  <Share2 className="w-8 h-8 text-primary text-teal-500 " />
                </div>
                <h3 className="text-xl font-serif font-bold">Save & Share</h3>
                <p className="text-muted-foreground">Download your fashion ideas as images and share with friends.</p>
              </div>
            </div>

            <div className="text-center p-6 hover:shadow-lg transition-shadow border rounded-xl bg-gray-100">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto bg-yellow-100">
                  <Shirt className="w-8 h-8 text-accent text-yellow-600 " />
                </div>
                <h3 className="text-xl font-serif font-bold">Simple & Fun</h3>
                <p className="text-muted-foreground">No design skills required. Create stunning outfits effortlessly.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground">
              Your Fashion Journey Starts Here.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of fashion enthusiasts who are already creating their dream outfits with our platform.
            </p>
            <Link to='/fashion-customizer'>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-lg bg-teal-500 hover:bg-teal-700 duration-300">
              Try It Now →
            </Button>
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}
