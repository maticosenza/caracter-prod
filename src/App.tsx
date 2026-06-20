import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "@/components/layout/RootLayout";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProjectDetail from "./pages/proyectos/ProjectDetail.tsx";
import Proyectos from "./pages/proyectos/Proyectos.tsx";
import Nosotros from "./pages/nosotros/Nosotros.tsx";
import Equipo from "./pages/nosotros/Equipo.tsx";
import Manifiesto from "./pages/nosotros/Manifiesto.tsx";
import Servicios from "./pages/servicios/Servicios.tsx";
import ServiceDetail from "./pages/servicios/ServiceDetail.tsx";
import Careers from "./pages/careers/Careers.tsx";
import Cultura from "./pages/careers/Cultura.tsx";
import Posiciones from "./pages/careers/Posiciones.tsx";
import Contacto from "./pages/contacto/Contacto.tsx";
import BuenosAires from "./pages/contacto/BuenosAires.tsx";
import Brief from "./pages/contacto/Brief.tsx";
import Insights from "./pages/insights/Insights.tsx";
import InsightDetail from "./pages/insights/InsightDetail.tsx";
import Unsubscribe from "./pages/Unsubscribe.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Index />} />

            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/nosotros/equipo" element={<Equipo />} />
            <Route path="/nosotros/manifiesto" element={<Manifiesto />} />

            <Route path="/servicios" element={<Servicios />} />
            <Route path="/servicios/:slug" element={<ServiceDetail />} />

            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/proyectos/:slug" element={<ProjectDetail />} />

            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/cultura" element={<Cultura />} />
            <Route path="/careers/posiciones-abiertas" element={<Posiciones />} />

            <Route path="/contacto" element={<Contacto />} />
            <Route path="/contacto/buenos-aires" element={<BuenosAires />} />
            <Route path="/contacto/brief" element={<Brief />} />

            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />

            <Route path="/unsubscribe" element={<Unsubscribe />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
