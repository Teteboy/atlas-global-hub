import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import { SiteContentProvider } from "@/hooks/use-site-content";
import { SiteTheme } from "@/components/SiteTheme";

import AppLayout from "@/components/layout/AppLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Sectors from "@/pages/Sectors";
import Projects from "@/pages/Projects";
import Insights from "@/pages/Insights";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminServices from "@/pages/admin/Services";
import AdminProjects from "@/pages/admin/Projects";
import AdminInsights from "@/pages/admin/Insights";
import AdminSectors from "@/pages/admin/Sectors";
import AdminLogin from "@/pages/admin/Login";
import AdminContent from "@/pages/admin/Content";
import AdminSettings from "@/pages/admin/Settings";
import ServiceForm from "@/pages/admin/ServiceForm";
import ProjectForm from "@/pages/admin/ProjectForm";
import InsightForm from "@/pages/admin/InsightForm";
import SectorForm from "@/pages/admin/SectorForm";
import ProjectDetail from "@/pages/ProjectDetail";
import InsightDetail from "@/pages/InsightDetail";
import ServiceDetail from "@/pages/ServiceDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 2 * 60 * 1000,
      retry: 1,
    },
  },
});

function Router() {
  return (
    <Switch>
      {/* Admin login */}
      <Route path="/admin/login" component={AdminLogin} />

      {/* Admin routes */}
      <Route path="/admin">
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </Route>
      <Route path="/admin/services">
        <AdminLayout>
          <AdminServices />
        </AdminLayout>
      </Route>
      <Route path="/admin/services/new">
        <AdminLayout>
          <ServiceForm />
        </AdminLayout>
      </Route>
      <Route path="/admin/services/:id/edit">
        <AdminLayout>
          <ServiceForm />
        </AdminLayout>
      </Route>
      <Route path="/admin/projects">
        <AdminLayout>
          <AdminProjects />
        </AdminLayout>
      </Route>
      <Route path="/admin/projects/new">
        <AdminLayout>
          <ProjectForm />
        </AdminLayout>
      </Route>
      <Route path="/admin/projects/:id/edit">
        <AdminLayout>
          <ProjectForm />
        </AdminLayout>
      </Route>
      <Route path="/admin/insights">
        <AdminLayout>
          <AdminInsights />
        </AdminLayout>
      </Route>
      <Route path="/admin/insights/new">
        <AdminLayout>
          <InsightForm />
        </AdminLayout>
      </Route>
      <Route path="/admin/insights/:id/edit">
        <AdminLayout>
          <InsightForm />
        </AdminLayout>
      </Route>
      <Route path="/admin/sectors">
        <AdminLayout>
          <AdminSectors />
        </AdminLayout>
      </Route>
      <Route path="/admin/sectors/new">
        <AdminLayout>
          <SectorForm />
        </AdminLayout>
      </Route>
      <Route path="/admin/sectors/:id/edit">
        <AdminLayout>
          <SectorForm />
        </AdminLayout>
      </Route>
      <Route path="/admin/content">
        <AdminLayout>
          <AdminContent />
        </AdminLayout>
      </Route>
      <Route path="/admin/settings">
        <AdminLayout>
          <AdminSettings />
        </AdminLayout>
      </Route>

      {/* Public routes */}
      <AppLayout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/services/:id" component={ServiceDetail} />
          <Route path="/sectors" component={Sectors} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/:id" component={ProjectDetail} />
          <Route path="/insights" component={Insights} />
          <Route path="/insights/:id" component={InsightDetail} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </AppLayout>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <SiteContentProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/,"")}>
              <SiteTheme />
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </SiteContentProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
