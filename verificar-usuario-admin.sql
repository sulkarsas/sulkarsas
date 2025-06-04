-- Verificar usuario admin en Supabase
-- EJECUTA ESTA CONSULTA EN EL SQL EDITOR DE SUPABASE

SELECT 
    id,
    username,
    email,
    full_name,
    role,
    is_active,
    created_at,
    last_login
FROM admin_users 
WHERE username = 'admin';

-- Si no aparece ningún resultado, ejecuta también:
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
