(function() {
    let existing = document.getElementById('tw-custom-hub-panel');
    if (existing) {
        existing.remove();
        return;
    }

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

        <!-- Контейнер для содержимого -->
        <div id="tw-hub-content-container" style="flex: 1; background: #fff8eb; color: #5b3511; padding: 15px; overflow: auto; box-sizing: border-box;">
            <div style="font-size: 12px; font-style: italic; color: #7d510f;">Здесь пока ничего нет. Вкладка 1 пуста.</div>
        </div>

        <!-- Нижняя строка состояния -->
        <div style="background: #1a1006; padding: 5px 12px; font-size: 10px; color: #a98a5c; border-top: 1px solid #7d510f; display: flex; justify-content: space-between; align-items: center;">
            <span>Статус: Панель активна</span>
            <span>Потяните за правый угол для изменения размера 📐</span>
        </div>
    `;

    document.body.appendChild(panel);
    document.getElementById('tw-hub-close').onclick = () => panel.remove();

    // Логика перетаскивания панели мышкой за шапку
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

    // Переключение вкладок (пока просто меняет текст-заглушку)
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
            let container = document.getElementById('tw-hub-content-container');
            container.innerHTML = `<div style="font-size: 12px; font-style: italic; color: #7d510f;">Здесь пока ничего нет. Вкладка ${tabNum} пуста.</div>`;
        };
    });
})();
void(0);
