# Reglas de Programación
Esta sección comprende las relgas de programación estándar que se requieren para garantizar un alto nivel de interoperabilidad técnica entre el código JavaScript compartido en proyectos de React. 

Las palabras clave “DEBE”, “NO DEBE”, “REQUERIDO”, “DEBERÁ”, “NO DEBERÁ”, “DEBERÍA”, “NO DEBERÍA”, “RECOMENDADO”, “PUEDE” y “OPCIONAL” en este documento deben interpretarse como se describe en **_[RFC 2119]_** https://www.ietf.org/rfc/rfc2119.txt

##  **React y Node.js**

- Los archivos DEBEN usar solo UTF-8 sin BOM para el código JavaScript.
- Se DEBE seguir una estructura de carpetas clara y coherente. Se tendrá una carpeta para el backend y una carpeta para tu frontend.
- Se DEBE tener rutas API (/api) claras y definidas para todas tus solicitudes de API.
- Los archivos DEBERÍAN declarar símbolos (clases, funciones, constantes, etc.) o causar efectos secundarios (por ejemplo, generar salida, cambiar la configuración, etc.), pero NO DEBERÍAN hacer ambas cosas.
- Los componentes DEBEN seguir la convención de nombres PascalCasey tener una única responsabilidad. Ejemplo:
```
//Bueno:
function Button() {
  return <button>Click me</button>;
}

//Malo:
function ButtonAndText() {
  return (
    <div>
      <button>Click me</button>
      <p>Hello World</p>
    </div>
  );
}
```
- Los Props DEBEN seguir la convención de nombres camelCase.
- Los nombres de los componentes DEBEN declararse en PascalCase.
- Las constantes de los componentes DEBEN declararse en mayúsculas con separadores de guiones bajos.
- Los nombres de los métodos DEBEN declararse en camelCase.
- La identación debe de ser de 4 espacios (una tabulación)
- las llaves que abren un bloque de código DEBEN ir en la misma línea. Ejemplo:
```
if (condicion) {
    // Código aquí
}
```
- En el código fuente NO DEBE haber CSS escrito, en su lugar se DEBE tener una carpeta común de archivos CSS utilizables en el código fuente
- Los commits enviados a Github se deben realizar siguiendo la estructura definida en https://gitmoji.dev/
##
# Estilo de Programación
###
## **Reglas para Componentes (React)**
1. Los componentes DEBEN tener una única responsabilidad. Cada componente debe encargarse de una única tarea o funcionalidad.
2. Los nombres de los componentes DEBEN seguir la convención PascalCase.
3. Los componentes DEBEN definirse como funciones en lugar de clases, a menos que se necesite un estado o ciclo de vida complejo.
4. Los componentes DEBEN devolver un único elemento raíz. Si necesitas devolver múltiples elementos, envuélvelos en un fragmento `(<>...</>)`.
5. Evita el uso de `ReactDOM.findDOMNode()`. Prefiere el uso de refs para interactuar con los nodos del DOM.

## **Reglas para Rutas (Node.js)**

1. Toda ruta DEBE estar asociada a un controlador.
2. Las rutas DEBEN seguir la convención de nombres kebab-case.
3. Evita rutas anidadas profundas. Si una ruta tiene más de tres niveles de anidación, considera refactorizarla.
4. Utiliza los métodos HTTP adecuados para cada ruta. Por ejemplo, GET para recuperar datos, POST para enviar datos, etc.

## **Reglas para Controladores (Node.js)**

1. Los controladores NO DEBEN hacer console.log. En su lugar, utiliza un paquete de logging como winston o morgan.
2. Los controladores DEBEN manejar errores correctamente. No ignores los errores; en su lugar, envíalos a un middleware de manejo de errores.
3. Los controladores NO DEBEN contener lógica de negocio. En su lugar, coloca la lógica de negocio en los servicios.

## **Reglas para Vistas (React)**

1. Las vistas DEBEN ser componentes de React.
2. Las vistas NO DEBEN contener CSS en línea. En su lugar, utiliza archivos CSS o styled-components.
3. Las vistas NO DEBEN contener lógica de negocio. Deben ser “tontas” y solo recibir datos a través de props.
4. Las vistas DEBEN ser funcionales a menos que necesiten un estado o ciclo de vida complejo.
