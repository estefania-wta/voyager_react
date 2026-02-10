    // src/components/layouts/Layout.tsx


import Header from './Header';
import Footer from './Footer';
import type { ReactNode } from 'react';

// ============================================
// 🎯 INTERFAZ: Props del componente
// ============================================

// Explicación de la interfaz:
// Define qué props (propiedades) acepta el componente
interface LayoutProps {
  children: ReactNode;  // ReactNode = cualquier cosa que React pueda renderizar
}

// Explicación de ReactNode:
// ReactNode puede ser: string, number, JSX elements, arrays, fragments, etc.
// Es el tipo más flexible para contenido que se puede mostrar


// ============================================
// 🎯 COMPONENTE LAYOUT
// ============================================

export default function Layout({ children }: LayoutProps) {
  // Explicación de { children }:
  // Esto es "destructuring" de props
  // Es lo mismo que: function Layout(props) { const children = props.children; }
  
  return (
    <>
      {/* Fragment vacío <> </> - no agrega un div extra al DOM */}
      
      {/* Header: Siempre se muestra en todas las páginas */}
      <Header />
      
      {/* Main: Contenedor principal del contenido */}
      <main className="main-content">
        {/* 
          {children}: Aquí se renderiza el contenido específico de cada página
          Si estás en /contact, aquí aparece el componente Contact
          Si estás en /plans, aquí aparece el componente Plans
        */}
        {children}
      </main>
      
      {/* Footer: Siempre se muestra en todas las páginas */}
      <Footer />
    </>
  );
}

// Explicación de <> </>:
// Se llama Fragment
// Agrupa elementos sin agregar un nodo extra al DOM
// Es útil cuando no quieres un <div> envolvente adicional