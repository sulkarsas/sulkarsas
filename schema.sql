-- =============================================
-- ESQUEMA DE BASE DE DATOS PARA SULKAR S.A.S.
-- =============================================
-- Este archivo contiene la estructura completa de la base de datos,
-- incluyendo tablas, políticas de seguridad (RLS), funciones y triggers.
-- Autor: V0
-- Fecha: 2025-05-27
-- Versión: 2.4 - Estructura flexible para admin_users
-- =============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- CONFIGURACIÓN DE ESQUEMAS
-- =============================================

-- Esquema público (accesible por usuarios autenticados y anónimos)
CREATE SCHEMA IF NOT EXISTS public;

-- =============================================
-- TABLAS
-- =============================================

-- Tabla de usuarios administradores (sin restricción de clave foránea)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID UNIQUE, -- ID opcional que puede vincularse con auth.users
    username TEXT UNIQUE NOT NULL CHECK (length(username) >= 3),
    email TEXT UNIQUE,
    password_hash TEXT, -- Opcional, para autenticación local si es necesario
    full_name TEXT,
    role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'admin',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

-- Tabla de blogs
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL CHECK (length(slug) >= 3),
    title TEXT NOT NULL CHECK (length(title) >= 3),
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    author TEXT NOT NULL,
    author_role TEXT DEFAULT 'Equipo SULKAR',
    author_image TEXT,
    image TEXT,
    featured_image TEXT,
    additional_images TEXT[] DEFAULT '{}',
    status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES admin_users(id),
    updated_by UUID REFERENCES admin_users(id)
);

-- Tabla de configuración del sitio
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES admin_users(id)
);

-- =============================================
-- ÍNDICES
-- =============================================

-- Índices para admin_users
CREATE INDEX IF NOT EXISTS admin_users_auth_id_idx ON admin_users(auth_id);
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON admin_users(email);

-- Índices para blogs
CREATE INDEX IF NOT EXISTS blogs_status_idx ON blogs(status);
CREATE INDEX IF NOT EXISTS blogs_category_idx ON blogs(category);
CREATE INDEX IF NOT EXISTS blogs_published_at_idx ON blogs(published_at);
CREATE INDEX IF NOT EXISTS blogs_tags_idx ON blogs USING GIN(tags);

-- =============================================
-- FUNCIONES Y TRIGGERS
-- =============================================

-- Función para actualizar el campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at en admin_users
CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON admin_users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Trigger para actualizar updated_at en blogs
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Trigger para actualizar updated_at en site_settings
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON site_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Función para establecer published_at cuando se publica un blog
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NEW.status = 'published' AND OLD.status != 'published' THEN
        NEW.published_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para establecer published_at
CREATE TRIGGER set_blog_published_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION set_published_at();

-- Función para verificar contraseña (usada por el servicio de autenticación)
CREATE OR REPLACE FUNCTION verify_password(user_password TEXT, password_hash TEXT)
RETURNS BOOLEAN 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN password_hash = crypt(user_password, password_hash);
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- POLÍTICAS DE SEGURIDAD (RLS) PERMISIVAS
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- =============================================
-- POLÍTICAS EXTREMADAMENTE PERMISIVAS
-- =============================================

-- Políticas para admin_users
-- Cualquiera puede ver los usuarios administradores
DROP POLICY IF EXISTS admin_users_select ON admin_users;
CREATE POLICY admin_users_select ON admin_users
    FOR SELECT USING (true);

-- Cualquiera puede insertar usuarios administradores
DROP POLICY IF EXISTS admin_users_insert ON admin_users;
CREATE POLICY admin_users_insert ON admin_users
    FOR INSERT WITH CHECK (true);

-- Cualquiera puede actualizar usuarios administradores
DROP POLICY IF EXISTS admin_users_update ON admin_users;
CREATE POLICY admin_users_update ON admin_users
    FOR UPDATE USING (true);

-- Cualquiera puede eliminar usuarios administradores
DROP POLICY IF EXISTS admin_users_delete ON admin_users;
CREATE POLICY admin_users_delete ON admin_users
    FOR DELETE USING (true);

-- Políticas para blogs
-- Cualquiera puede ver todos los blogs
DROP POLICY IF EXISTS blogs_select_public ON blogs;
DROP POLICY IF EXISTS blogs_select_admin ON blogs;
CREATE POLICY blogs_select_all ON blogs
    FOR SELECT USING (true);

-- Cualquiera puede crear blogs
DROP POLICY IF EXISTS blogs_insert ON blogs;
CREATE POLICY blogs_insert ON blogs
    FOR INSERT WITH CHECK (true);

-- Cualquiera puede actualizar blogs
DROP POLICY IF EXISTS blogs_update ON blogs;
CREATE POLICY blogs_update ON blogs
    FOR UPDATE USING (true);

-- Cualquiera puede eliminar blogs
DROP POLICY IF EXISTS blogs_delete ON blogs;
CREATE POLICY blogs_delete ON blogs
    FOR DELETE USING (true);

-- Políticas para site_settings
-- Cualquiera puede ver la configuración del sitio
DROP POLICY IF EXISTS site_settings_select ON site_settings;
CREATE POLICY site_settings_select ON site_settings
    FOR SELECT USING (true);

-- Cualquiera puede modificar la configuración
DROP POLICY IF EXISTS site_settings_insert ON site_settings;
CREATE POLICY site_settings_insert ON site_settings
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS site_settings_update ON site_settings;
CREATE POLICY site_settings_update ON site_settings
    FOR UPDATE USING (true);

DROP POLICY IF EXISTS site_settings_delete ON site_settings;
CREATE POLICY site_settings_delete ON site_settings
    FOR DELETE USING (true);

-- =============================================
-- DATOS INICIALES
-- =============================================

-- Insertar usuario administrador (sin vinculación estricta con auth.users)
INSERT INTO admin_users (id, username, email, password_hash, full_name, role)
VALUES (
    '6fdd17d5-084d-4cbf-a6dc-b10bfa957003'::UUID,
    'admin',
    'sulkarsas@gmail.com',
    crypt('sulkar2024', gen_salt('bf')),
    'Administrador SULKAR',
    'admin'
) ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();

-- Insertar configuraciones iniciales del sitio
INSERT INTO site_settings (key, value, description)
VALUES 
    ('contact_info', 
     '{"address": "Calle 8 Sur #12-116, Guadalajara de Buga (V), Colombia", "phone": "3173623505", "email": "contactosulkar@gmail.com"}',
     'Información de contacto de la empresa'
    ),
    ('social_media',
     '{"facebook": "https://facebook.com/sulkar", "instagram": "https://instagram.com/sulkar", "linkedin": "https://linkedin.com/company/sulkar"}',
     'Enlaces a redes sociales'
    ),
    ('site_meta',
     '{"title": "SULKAR S.A.S. - Exportación e Importación", "description": "Empresa colombiana dedicada a la exportación e importación de productos de alta calidad"}',
     'Metadatos del sitio para SEO'
    )
ON CONFLICT (key) DO NOTHING;

-- Insertar blog de ejemplo
INSERT INTO blogs (
    slug, 
    title, 
    excerpt, 
    content, 
    category, 
    tags, 
    author, 
    author_role, 
    author_image, 
    image, 
    status, 
    published_at,
    created_by
)
VALUES (
    'bienvenidos-a-sulkar',
    'Bienvenidos al blog de SULKAR S.A.S.',
    'Te damos la bienvenida al blog oficial de SULKAR S.A.S., donde compartiremos noticias, tendencias y conocimientos sobre comercio internacional.',
    '# Bienvenidos al blog de SULKAR S.A.S.

Nos complace darte la bienvenida al blog oficial de SULKAR S.A.S., tu aliado estratégico en comercio internacional.

## ¿Qué encontrarás aquí?

En este espacio compartiremos:

- **Tendencias del mercado**: Análisis de las últimas tendencias en importación y exportación
- **Guías prácticas**: Consejos y mejores prácticas para el comercio internacional
- **Noticias de la empresa**: Actualizaciones sobre nuestros servicios y logros
- **Casos de éxito**: Historias inspiradoras de nuestros clientes y proyectos

## Nuestro compromiso

En SULKAR S.A.S. creemos en los negocios con propósito, donde la confianza, la integridad y las relaciones duraderas son nuestra base.

¡Gracias por acompañarnos en este viaje!',
    'General',
    ARRAY['Bienvenida', 'SULKAR', 'Comercio Internacional'],
    'Admin SULKAR',
    'Administrador',
    '/team/maria.png',
    '/global-commerce-alliance.webp',
    'published',
    NOW(),
    '6fdd17d5-084d-4cbf-a6dc-b10bfa957003'::UUID
) ON CONFLICT (slug) DO NOTHING;
