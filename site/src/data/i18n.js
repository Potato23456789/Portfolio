export const strings = {
  en: {
    nav: {
      home: 'Home', about: 'About', projects: 'Projects',
      skills: 'Skills', contact: 'Contact',
    },
    home: {
      heroPlaceholder: 'Animation coming soon',
      heroTitle: 'Nguyen Xuan Binh',
      heroSub: '3D Artist · Video Editor · Designer',
    },
    about: {
      title: 'About Me',
      sub: '3D Artist, Video Editor & Designer based in Vietnam',
      bio: 'I create 3D visualizations, brand identities, and immersive environments. Specializing in architectural rendering and product visualization using Blender and Substance Painter.',
    },
    skills: { title: 'Skills & Tools', sub: 'Software I work with' },
    contact: { title: 'Contact', sub: "Let's work together" },
  },
  vi: {
    nav: {
      home: 'Trang chủ', about: 'Giới thiệu', projects: 'Dự án',
      skills: 'Kỹ năng', contact: 'Liên hệ',
    },
    home: {
      heroPlaceholder: 'Animation sắp ra mắt',
      heroTitle: 'Nguyễn Xuân Bình',
      heroSub: 'Nghệ sĩ 3D · Dựng phim · Thiết kế',
    },
    about: {
      title: 'Giới thiệu',
      sub: 'Nghệ sĩ 3D, Dựng phim & Thiết kế tại Việt Nam',
      bio: 'Tôi tạo ra các hình ảnh 3D, thiết kế thương hiệu và không gian nhập vai. Chuyên về render kiến trúc và hình ảnh sản phẩm sử dụng Blender và Substance Painter.',
    },
    skills: { title: 'Kỹ năng & Công cụ', sub: 'Phần mềm tôi sử dụng' },
    contact: { title: 'Liên hệ', sub: 'Hãy cùng hợp tác' },
  },
}

export function t(lang, path) {
  const keys = path.split('.')
  let val = strings[lang] || strings.en
  for (const k of keys) val = val?.[k]
  return val ?? path
}
