import React from "react";
import {Link} from 'react-router-dom'
import { Card, CardContent } from "../components/ui/Card";
import {Button} from '../components/ui/Button'
import { Users, Target, Heart, Award } from "lucide-react";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
              About <span className="text-primary text-teal-500">StyleCraft</span>
            </h1>
            <p className="text-xl text-muted-foreground text-gray-600 leading-relaxed">
              We're passionate about democratizing fashion design and empowering
              everyone to express their unique style through innovative
              technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At StyleCraft, we believe that fashion design should be
                accessible to everyone, not just professional designers. Our
                interactive platform breaks down barriers and makes it easy for
                anyone to create stunning, personalized outfits.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're a fashion enthusiast, a budding designer, or
                someone who simply loves to experiment with style, our tools are
                designed to inspire creativity and bring your fashion visions to
                life.
              </p>
            </div>
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <Heart className="w-24 h-24 text-primary mx-auto text-teal-500" />
                <p className="text-lg font-serif font-bold text-foreground text-black/70">
                  Made with Passion
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow bg-gray-100 py-5">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto bg-gray-200">
                    <Users className="w-8 h-8 text-primary text-teal-500" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Inclusivity</h3>
                  <p className="text-muted-foreground">
                    Fashion design for everyone, regardless of experience or
                    background.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow bg-gray-100 py-5">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto bg-yellow-100">
                    <Target className="w-8 h-8 text-accent text-yellow-600 " />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Innovation</h3>
                  <p className="text-muted-foreground">
                    Cutting-edge technology that makes design intuitive and fun.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow bg-gray-100 py-5">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto bg-gray-200">
                    <Heart className="w-8 h-8 text-primary text-teal-500 " />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Creativity</h3>
                  <p className="text-muted-foreground">
                    Empowering self-expression through personalized fashion
                    design.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow bg-gray-100 py-5">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto bg-yellow-100">
                    <Award className="w-8 h-8 text-accent text-yellow-600 " />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Quality</h3>
                  <p className="text-muted-foreground">
                    Premium tools and features that deliver professional
                    results.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our diverse team of designers, developers, and fashion enthusiasts
              work together to create the best possible experience for our
              users. We're united by our passion for fashion and technology.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto flex items-center justify-center bg-gray-200">
                  <Users className="w-16 h-16 text-primary text-teal-500" />
                </div>
                <h3 className="text-xl font-serif font-bold">Design Team</h3>
                <p className="text-muted-foreground">
                  Creating intuitive and beautiful user experiences
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full mx-auto flex items-center justify-center bg-yellow-100">
                  <Target className="w-16 h-16 text-accent text-yellow-600" />
                </div>
                <h3 className="text-xl font-serif font-bold">
                  Development Team
                </h3>
                <p className="text-muted-foreground">
                  Building robust and innovative technology solutions
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto flex items-center justify-center bg-gray-200">
                  <Heart className="w-16 h-16 text-primary text-teal-500" />
                </div>
                <h3 className="text-xl font-serif font-bold">Fashion Experts</h3>
                <p className="text-muted-foreground">
                  Bringing industry knowledge and trend insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground">
              Ready to Start Creating?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community of fashion creators and start designing your
              dream outfits today.
            </p>
            <Link to='/fashion-customizer'>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg bg-teal-500 hover:bg-teal-700 duration-300">
              Get Started →
            </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
