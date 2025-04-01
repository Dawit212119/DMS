import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PlusCircle,
  FileText,
  Image,
  ClipboardCheck,
  FolderPlus,
  Clock,
} from "lucide-react";
import Container from "@/components/container";

export default function HomePage() {
  return (
    <Container>
      <div className="flex min-h-screen flex-col scroll-smooth">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 ">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-700">
                      Manage Your Projects With Ease
                    </h1>
                    <p className="max-w-[600px] text-green-700 md:text-xl">
                      Streamline your document management workflow with our
                      comprehensive solution for site documentation, reports,
                      and checklists.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <FolderPlus className="mr-2 h-4 w-4" />
                      Create New Project
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="border-green-600 text-green-700 hover:bg-green-50"
                    >
                      <a href="#learn-more">Learn More</a>
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <div className="relative h-[350px] w-full max-w-[500px] rounded-lg bg-gradient-to-br from-blue-100 to-green-100 p-6 shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid gap-4 p-6">
                        <div className="h-20 w-full rounded-lg bg-white shadow-sm"></div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-32 rounded-lg bg-white shadow-sm"></div>
                          <div className="h-32 rounded-lg bg-white shadow-sm"></div>
                          <div className="h-32 rounded-lg bg-white shadow-sm"></div>
                        </div>
                        <div className="h-12 w-full rounded-lg bg-white shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-700">
                    Project Dashboard
                  </h2>
                  <p className="max-w-[900px] text-green-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Create and manage your projects with our intuitive
                    dashboard. Access all your documents, reports, and
                    checklists in one place.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-2 border-dashed border-green-200 flex flex-col items-center justify-center p-6 h-[300px] hover:border-green-400 transition-colors">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="rounded-full bg-blue-100 p-4">
                      <PlusCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-blue-700">
                        Create New Project
                      </h3>
                      <p className="text-green-700">
                        Start a new project with customizable templates
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="border border-green-100 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-blue-700">
                      Site Renovation
                    </CardTitle>
                    <CardDescription className="text-green-600">
                      Project ID: PRJ-2025-001
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Image className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-green-700">
                          Site Pictures
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-green-700">Reports</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-green-700">
                          Checklists
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-green-700">Timeline</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500 text-blue-700 hover:bg-blue-50"
                    >
                      View Project
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border border-green-100 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-blue-700">
                      Office Expansion
                    </CardTitle>
                    <CardDescription className="text-green-600">
                      Project ID: PRJ-2025-002
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Image className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-green-700">
                          Site Pictures
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-green-700">Reports</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-green-700">
                          Checklists
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-green-700">Timeline</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500 text-blue-700 hover:bg-blue-50"
                    >
                      View Project
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-green-50">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-700">
                    Project Management Tools
                  </h2>
                  <p className="text-green-700">
                    Access all the tools you need to manage your projects
                    effectively.
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border border-green-100 shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="p-4">
                        <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
                          <Image className="h-5 w-5 text-green-600" />
                          Site Pictures
                        </CardTitle>
                      </CardHeader>
                    </Card>

                    <Card className="border border-green-100 shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="p-4">
                        <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
                          <FileText className="h-5 w-5 text-green-600" />
                          Reports
                        </CardTitle>
                      </CardHeader>
                    </Card>

                    <Card className="border border-green-100 shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="p-4">
                        <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
                          <ClipboardCheck className="h-5 w-5 text-green-600" />
                          Checklists
                        </CardTitle>
                      </CardHeader>
                    </Card>

                    <Card className="border border-green-100 shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="p-4">
                        <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
                          <Clock className="h-5 w-5 text-green-600" />
                          Timeline
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-700">
                    Key Features
                  </h2>
                  <p className="text-green-700">
                    Our document management system provides everything you need
                    to manage your projects.
                  </p>

                  <div className="space-y-4">
                    <Card className="border border-green-100 shadow-md">
                      <CardHeader className="p-4">
                        <CardTitle className="text-base text-blue-700">
                          Centralized Document Storage
                        </CardTitle>
                        <CardDescription className="text-green-600">
                          Keep all your project documents in one secure location
                        </CardDescription>
                      </CardHeader>
                    </Card>

                    <Card className="border border-green-100 shadow-md">
                      <CardHeader className="p-4">
                        <CardTitle className="text-base text-blue-700">
                          Customizable Checklists
                        </CardTitle>
                        <CardDescription className="text-green-600">
                          Create and manage checklists tailored to your project
                          needs
                        </CardDescription>
                      </CardHeader>
                    </Card>

                    <Card className="border border-green-100 shadow-md">
                      <CardHeader className="p-4">
                        <CardTitle className="text-base text-blue-700">
                          Comprehensive Reporting
                        </CardTitle>
                        <CardDescription className="text-green-600">
                          Generate detailed reports for project stakeholders
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="learn-more"
            className="w-full py-12 md:py-24 lg:py-32 scroll-mt-16"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-700">
                    About EFile
                  </h2>
                  <p className="max-w-[900px] text-green-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our comprehensive document management system designed
                    specifically for project management.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="border border-green-100 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-blue-700">
                      Document Organization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-700">
                      Keep all your project documents organized in one central
                      location. Our intuitive folder structure makes it easy to
                      find what you need when you need it.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <ul className="list-disc pl-5 text-sm text-blue-600 space-y-1">
                      <li>Customizable folder structures</li>
                      <li>Powerful search functionality</li>
                      <li>Version control for all documents</li>
                    </ul>
                  </CardFooter>
                </Card>

                <Card className="border border-green-100 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-blue-700">
                      Project Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-700">
                      Manage all aspects of your projects from start to finish.
                      Track progress, assign tasks, and ensure nothing falls
                      through the cracks.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <ul className="list-disc pl-5 text-sm text-blue-600 space-y-1">
                      <li>Interactive project timelines</li>
                      <li>Task assignment and tracking</li>
                      <li>Automated progress reporting</li>
                    </ul>
                  </CardFooter>
                </Card>

                <Card className="border border-green-100 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-blue-700">
                      Collaboration Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-700">
                      Work together with your team no matter where they are. Our
                      collaboration tools make it easy to share information and
                      get feedback.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <ul className="list-disc pl-5 text-sm text-blue-600 space-y-1">
                      <li>Real-time document editing</li>
                      <li>Comment and feedback system</li>
                      <li>Permission-based access control</li>
                    </ul>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-green-50 p-6 border border-green-100 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-blue-700">
                    How It Works
                  </h3>
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-700">
                          Create a Project
                        </h4>
                        <p className="text-green-700">
                          Start by creating a new project and setting up the
                          basic information.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-700">
                          Add Documentation
                        </h4>
                        <p className="text-green-700">
                          Upload site pictures, reports, and create checklists
                          for your project.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-700">
                          Manage Your Project
                        </h4>
                        <p className="text-green-700">
                          Track progress, update documentation, and collaborate
                          with your team.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                        4
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-700">
                          Generate Reports
                        </h4>
                        <p className="text-green-700">
                          Create comprehensive reports for stakeholders and
                          project reviews.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-green-50 p-6 border border-green-100 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-blue-700">
                    Why Choose EFile
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-700">Easy to Use</h4>
                        <p className="text-green-700">
                          Intuitive interface designed for users of all
                          technical levels.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-700">Secure</h4>
                        <p className="text-green-700">
                          Enterprise-grade security to protect your sensitive
                          project data.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-700">Scalable</h4>
                        <p className="text-green-700">
                          Grows with your business from small projects to
                          enterprise-level management.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-700">
                          Customizable
                        </h4>
                        <p className="text-green-700">
                          Tailor the system to match your specific project
                          management needs.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-green-50">
            <div className="container px-4 md:px-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6 text-blue-700">
                Ready to Get Started?
              </h2>
              <p className="max-w-[600px] mx-auto text-green-700 md:text-xl/relaxed mb-8">
                Create your first project and experience the power of our
                document management system.
              </p>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <FolderPlus className="mr-2 h-4 w-4" />
                Create New Project
              </Button>
            </div>
          </section>
        </main>
        <footer className="w-full border-t border-green-100 py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm leading-loose text-green-700 md:text-left">
              © 2025 EFile. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                Terms
              </Link>
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </Container>
  );
}
