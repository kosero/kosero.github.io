document.addEventListener('DOMContentLoaded', () => {
    // Tüm navigasyon bağlantılarını seç
    const navLinks = document.querySelectorAll('.header a');
    // Tüm içerik bölümlerini seç
    const contentSections = document.querySelectorAll('.content');

    // Tüm içerik bölümlerini gizleyen bir fonksiyon
    function hideAllContent() {
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
    }

    // Belirli bir içerik bölümünü gösteren fonksiyon
    function showContent(id) {
        hideAllContent(); // Önce tümünü gizle
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.style.display = 'block'; // veya 'flex', 'grid' duruma göre
        }
    }

    // Navigasyon bağlantılarına tıklama olayı dinleyicileri ekle
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Varsayılan bağlantı davranışını engelle (sayfa yenilenmesi veya atlama)

            const targetId = link.getAttribute('href').substring(1); // # işaretini kaldırarak id'yi al
            showContent(targetId);

            // URL'deki fragment'ı güncelle (isteğe bağlı, tarayıcı geçmişini korur)
            history.pushState(null, '', link.getAttribute('href'));
        });
    });

    // Sayfa yüklendiğinde veya URL'de bir fragment varsa ilgili içeriği göster
    function handleInitialLoad() {
        const hash = window.location.hash.substring(1); // URL'deki #fragment'ı al
        if (hash) {
            showContent(hash);
        } else {
            // Hiç hash yoksa varsayılan olarak "home" bölümünü göster
            showContent('home');
        }
    }

    // Sayfa yüklendiğinde ve URL fragment'ı değiştiğinde (geri/ileri tuşları) çalıştır
    window.addEventListener('popstate', handleInitialLoad);
    handleInitialLoad(); // İlk yüklemede de çağır
});
