(function() {
    let existing = document.getElementById('tw-custom-hub-panel');
    if (existing) {
        existing.remove();
        return;
    }

    // ==========================================
    // НАСТРОЙКА ССЫЛОК НА СКРИПТЫ ДЛЯ КАЖДОЙ ВКЛАДКИ
    // Укажите прямые ссылки (Raw) на файлы из вашего репозитория.
    // Если вкладка должна быть пустой, оставьте поле пустым: ""
    // ==========================================
    const tabLinks = {
        1: "https://raw.githubusercontent.com/jura75/project-s-files-pak/refs/heads/main/table%20units.js",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: ""
    };

    let panel = document.createElement('div');
    panel.id = 'tw-custom-hub-panel';
    panel.style.cssText = `
        position: fixed;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        width: 1180px;
        height: 680px;
        background: #2b1d0c;
        border: 3px solid #7d510f;
        box-shadow: 0 6px 20px rgba(0,0,0,0.8);
        z-index: 99999;
        font-family: Verdana, Arial, sans-serif;
        color: #f4e4bc;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        resize: both;
    `;

    panel.innerHTML = `
        <!-- Шапка панели (перетаскиваемая область) -->
        <div id="tw-hub-header" style="background: #1a1006; padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #7d510f; user-select: none; cursor: move;">
            <b style="font-size: 13px; color: #f4e4bc;">🛠️ ТВ Кастом Хаб</b>
            <span id="tw-hub-close" style="cursor: pointer; color: #a63a3a; font-weight: bold; font-size: 16px; padding: 0 4px;">✕</span>
        </div>
        
        <!-- Верхняя панель с 9 вкладками -->
        <div style="display: flex; gap: 2px; padding: 6px 8px; background: #1f1307; border-bottom: 2px solid #7d510f; overflow-x: auto;">
            <button class="tw-hub-tab-btn active" data-tab="1" style="background: #5a3b0c; border: 1px solid #7d510f; color: #fff; padding: 6px 12px; font-size: 11px; font-weight: bold; cursor: pointer; border-radius: 3px; white-space: nowrap;">Вкладка 1</button>
            <button class="tw-hub-tab-btn" data-tab="2" style="background: #3b2812; border: 1px solid #7d510f; color: #f4e4bc; padding: 6px 12px; font-size: 11px; font-weight: bold; cursor: pointer; border-radius: 3px; white-space: nowrap;">Вкладка 2</button>
            <button class="tw-hub-tab-btn" data-tab="3" style="background: #3b2812; border: 1px solid #7d510f; color: #f4e4bc; padding: 6px 12px; font-size: 11px; font-weight: bold; cursor: pointer; border-radius: 3px; white-space: nowrap;">Вкладка 3</button>
            <button class="tw-hub-tab-btn" data-tab="4" style="background: #3b2812; border: 1px solid #7d510f; color: #f4e4bc; padding: 6px 12px; font-size: 11px; font-weight: bold; cursor: pointer; border-radius: 3px; white-space: nowrap;">Вкладка 4</button>
            <button class="tw-hub-tab-btn" data-tab="5" style="background: #3b2812; border: 1px solid #7d510f; color: #f4e4bc; padding: 6px 12px; font-size: 11px; font-weight: bold; cursor: pointer; border-radius: 3px; white-space: nowrap;">Вкладка 5</button>
            <button class="tw-hub-tab-btn" data-tab="6" style="background: #3b2812; border: 1px solid #7d510f; color: #f4e4bc; padding: 6px 12px; font-size: 11px; font-weight: bold; cursor: pointer; border-radius: 3px; white-space: nowrap;">Вкладка 6</button>
            <button class="tw-hub-tab-btn" data-tab="7" style="background: #3b2812; border: 1px solid #7d510f; color: #f4e4bc; padding: 6px 12px; font-size: 11px; font-weight: bold; cursor: pointer; border-radius: 3px; white-space: nowrap;">Вкладка 7</button>
            <button class="tw-hub-tab-btn" data-tab="8" style="background: #3b2812; border: 1px solid #7d510f; color: #f4e4bc; padding: 6px 12px; font-size: 11px; font-weight: bold; cursor: pointer; border-radius: 3px; white-space: nowrap;">Вкладка 8</button>
            <button class="tw-hub-tab-btn" data-tab="9" style="background: #3b2812; border: 1px solid #7d510f; color: #f4e4bc; padding: 6px 12px; font-size: 11px; font-weight: bold; cursor: pointer; border-radius: 3px; white-space: nowrap;">Вкладка 9</button>
        </div>

        <!-- Контейнер для содержимого (куда будут встраиваться скрипты вкладки) -->
        <div id="tw-hub-content-container" style="flex: 1; background: #fff8eb; color: #5b3511; overflow: auto; position: relative; display: flex; flex-direction: column;">
            <div style="padding: 15px; font-size: 12px; font-style: italic; color: #7d510f;">Загрузка...</div>
        </div>

        <!-- Нижняя строка состояния -->
        <div style="background: #1a1006; padding: 5px 12px; font-size: 10px; color: #a98a5c; border-top: 1px solid #7d510f; display: flex; justify-content: space-between; align-items: center;">
            <span>Статус: Панель активна</span>
            <span>Потяните за правый угол для изменения размера 📐</span>
        </div>
    `;

    document.body.appendChild(panel);
    document.getElementById('tw-hub-close').onclick = () => panel.remove();

    // Перетаскивание панели мышкой за шапку
    let header = document.getElementById('tw-hub-header');
    let isDragging = false;
    let startX = 0, startY = 0;

    header.onmousedown = function(e) {
        if (e.target.id === 'tw-hub-close') return;
        isDragging = true;
        startX = e.clientX - panel.offsetLeft;
        startY = e.clientY - panel.offsetTop;

        if (panel.style.transform.includes('translateX')) {
            let rect = panel.getBoundingClientRect();
            panel.style.transform = 'none';
            panel.style.left = rect.left + 'px';
            panel.style.top = rect.top + 'px';
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
    };

    function onMouseMove(e) {
        if (!isDragging) return;
        let newX = e.clientX - startX;
        let newY = e.clientY - startY;
        panel.style.left = Math.max(0, newX) + 'px';
        panel.style.top = Math.max(0, newY) + 'px';
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // Функция загрузки и отрисовки содержимого вкладки внутри панели
    function loadTab(tabNum) {
        let container = document.getElementById('tw-hub-content-container');
        container.innerHTML = '';

        let scriptUrl = tabLinks[tabNum];

        // Если ссылка для вкладки не заполнена
        if (!scriptUrl || scriptUrl.trim() === "") {
            container.innerHTML = `<div style="padding: 15px; font-size: 12px; font-style: italic; color: #7d510f;">Вкладка ${tabNum} пуста. Добавьте ссылку на скрипт в массив ` + "`tabLinks`" + ` в коде панели.</div>`;
            return;
        }

        container.innerHTML = `<div style="padding: 15px; font-size: 12px; color: #7d510f;">Загрузка скрипта для вкладки ${tabNum}...</div>`;

        // Загружаем файл скрипта из вашего репозитория
        fetch(scriptUrl + '?_=' + Date.now())
            .then(response => {
                if (!response.ok) throw new Error('Ошибка загрузки файла');
                return response.text();
            })
            .then(scriptCode => {
                container.innerHTML = '';
                
                // Создаем внутренний оберточный контейнер для интерфейса скрипта
                let tabInnerWrapper = document.createElement('div');
                tabInnerWrapper.style.cssText = 'width: 100%; height: 100%; overflow: auto; box-sizing: border-box; position: relative;';
                container.appendChild(tabInnerWrapper);

                // Перехватываем добавление элементов в DOM, чтобы интерфейсы ваших скриптов 
                // рендерились строго ВНУТРИ этой вкладки, а не поверх всей игры
                let originalAppendChild = document.body.appendChild;
                document.body.appendChild = function(node) {
                    if (node && node.nodeType === 1 && node.id !== 'tw-custom-hub-panel') {
                        tabInnerWrapper.appendChild(node);
                        // Сбрасываем абсолютное позиционирование интерфейса скрипта под размеры вкладки
                        node.style.cssText += '; position: relative !important; top: auto !important; left: auto !important; transform: none !important; margin: 0 auto !important; max-width: 100% !important; box-sizing: border-box !important;';
                        document.body.appendChild = originalAppendChild;
                        return node;
                    }
                    return originalAppendChild.call(document.body, node);
                };

                try {
                    // Исполняем код скрипта вкладки
                    let s = document.createElement('script');
                    s.textContent = scriptCode;
                    document.body.appendChild(s);
                    s.remove();
                } finally {
                    document.body.appendChild = originalAppendChild;
                }
            })
            .catch(err => {
                container.innerHTML = `<div style="padding: 15px; font-size: 12px; color: #b22222;">Не удалось загрузить скрипт для вкладки ${tabNum}. Проверьте правильность ссылки.</div>`;
            });
    }

    // Обработка переключения вкладок
    panel.querySelectorAll('.tw-hub-tab-btn').forEach(btn => {
        btn.onclick = function() {
            panel.querySelectorAll('.tw-hub-tab-btn').forEach(b => {
                b.style.background = '#3b2812';
                b.style.color = '#f4e4bc';
                b.classList.remove('active');
            });
            this.style.background = '#5a3b0c';
            this.style.color = '#fff';
            this.classList.add('active');

            let tabNum = this.getAttribute('data-tab');
            loadTab(tabNum);
        };
    });

    // Автоматически загружаем первую вкладку при открытии панели
    loadTab('1');
})();
void(0);
