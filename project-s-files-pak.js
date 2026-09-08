(function() {
    let existing = document.getElementById('tw-custom-hub-panel'); 
    if (existing) {
        existing.remove();
        return;
    }

    const tabLinks = {
        1: "https://raw.githubusercontent.com/jura75/project-s-files-pak/refs/heads/main/table%20units.js",
        2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: ""
    };

    let panel = document.createElement('div');
    panel.id = 'tw-custom-hub-panel';
    panel.style.cssText = `
        position: fixed; top: 60px; left: 50%; transform: translateX(-50%);
        width: 1180px; height: 680px; background: #2b1d0c; border: 3px solid #7d510f;
        box-shadow: 0 6px 20px rgba(0,0,0,0.8); z-index: 99999;
        font-family: Verdana, Arial, sans-serif; color: #f4e4bc; border-radius: 4px;
        display: flex; flex-direction: column; overflow: hidden; resize: both;
    `;

    panel.innerHTML = `
        <div id="tw-hub-header" style="background: #1a1006; padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #7d510f; user-select: none; cursor: move;">
            <b style="font-size: 13px; color: #f4e4bc;">🛠️ ТВ Кастом Хаб</b>
            <span id="tw-hub-close" style="cursor: pointer; color: #a63a3a; font-weight: bold; font-size: 16px; padding: 0 4px;">✕</span>
        </div>
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
        <div id="tw-hub-content-container" style="flex: 1; background: #fff8eb; color: #5b3511; overflow: auto; position: relative; display: flex; flex-direction: column;">
            <div style="padding: 15px; font-size: 12px; font-style: italic; color: #7d510f;">Загрузка...</div>
        </div>
        <div style="background: #1a1006; padding: 5px 12px; font-size: 10px; color: #a98a5c; border-top: 1px solid #7d510f; display: flex; justify-content: space-between; align-items: center;">
            <span>Статус: Панель активна</span>
            <span>Потяните за правый угол для изменения размера 📐</span>
        </div>
    `;

    document.body.appendChild(panel);
    document.getElementById('tw-hub-close').onclick = () => panel.remove();

    let header = document.getElementById('tw-hub-header');
    let isDragging = false, startX = 0, startY = 0;
    header.onmousedown = function(e) {
        if (e.target.id === 'tw-hub-close') return;
        isDragging = true;
        startX = e.clientX - panel.offsetLeft;
        startY = e.clientY - panel.offsetTop;
        if (panel.style.transform.includes('translateX')) {
            let rect = panel.getBoundingClientRect();
            panel.style.transform = 'none';
            panel.style.left = rect.left + 'px'; panel.style.top = rect.top + 'px';
            startX = e.clientX - rect.left; startY = e.clientY - rect.top;
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
    };
    function onMouseMove(e) {
        if (!isDragging) return;
        panel.style.left = Math.max(0, e.clientX - startX) + 'px';
        panel.style.top = Math.max(0, e.clientY - startY) + 'px';
    }
    function onMouseUp() { isDragging = false; document.removeEventListener('mousemove', onMouseMove); document.removeEventListener('mouseup', onMouseUp); }

    function loadTab(tabNum) {
        let container = document.getElementById('tw-hub-content-container');
        container.innerHTML = '';
        let scriptUrl = tabLinks[tabNum];

        if (!scriptUrl || scriptUrl.trim() === "") {
            container.innerHTML = `<div style="padding: 15px; font-size: 12px; font-style: italic; color: #7d510f;">Вкладка ${tabNum} пуста.</div>`;
            return;
        }

        container.innerHTML = `<div style="padding: 15px; font-size: 12px; color: #7d510f;">Загрузка скрипта...</div>`;

        fetch(scriptUrl + '?_=' + Date.now())
            .then(res => res.text())
            .then(code => {
                container.innerHTML = '';
                let tabInnerWrapper = document.createElement('div');
                tabInnerWrapper.style.cssText = 'width: 100%; height: 100%; overflow: auto; box-sizing: border-box; position: relative;';
                container.appendChild(tabInnerWrapper);

                // Перехватываем появление новых окон/элементов
                let originalAppendChild = document.body.appendChild;
                document.body.appendChild = function(node) {
                    if (node && node.nodeType === 1 && node.id !== 'tw-custom-hub-panel') {
                        // Если скрипт пытается создать свое плавающее окно, встраиваем его внутрь вкладки
                        tabInnerWrapper.appendChild(node);
                        node.style.cssText += '; position: relative !important; top: auto !important; left: auto !important; transform: none !important; margin: 0 auto !important; max-width: 100% !important; box-sizing: border-box !important; display: block !important;';
                        document.body.appendChild = originalAppendChild;
                        return node;
                    }
                    return originalAppendChild.call(document.body, node);
                };

                try {
                    // Создаем изолированный контекст для выполнения кода вкладки
                    let runScript = new Function('container', code);
                    runScript(tabInnerWrapper);
                } catch(e) {
                    // Если код написан как обычный скрипт с внедрением в body
                    let s = document.createElement('script');
                    s.textContent = code;
                    document.body.appendChild(s);
                    s.remove();
                } finally {
                    document.body.appendChild = originalAppendChild;
                }
            })
            .catch(() => {
                container.innerHTML = `<div style="padding: 15px; font-size: 12px; color: #b22222;">Ошибка загрузки скрипта.</div>`;
            });
    }

    panel.querySelectorAll('.tw-hub-tab-btn').forEach(btn => {
        btn.onclick = function() {
            panel.querySelectorAll('.tw-hub-tab-btn').forEach(b => {
                b.style.background = '#3b2812'; b.style.color = '#f4e4bc'; b.classList.remove('active');
            });
            this.style.background = '#5a3b0c'; this.style.color = '#fff'; this.classList.add('active');
            loadTab(this.getAttribute('data-tab'));
        };
    });

    loadTab('1');
})();
void(0);
