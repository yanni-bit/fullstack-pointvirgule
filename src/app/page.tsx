import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import TechStack from "../components/TechStack";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { createPublicClient } from "../lib/supabase";
import type { Project } from "../lib/types";

async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });
    return (data as Project[]) || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Portfolio initialProjects={projects} />
        <TechStack />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}