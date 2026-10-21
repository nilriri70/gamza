/**
 * [화면 3: 글쓰기 화면] 동작 스크립트 (screen3_write.js)
 * - window.GamzaWriteView 객체 제공: init(onProductCreated, onCancel), open(), close()
 * - 이미지 파일 업로드(FileReader) 실시간 미리보기 및 감자 마켓 테마 기본 SVG 일러스트 자동 적용
 * - 폼 제출 시 새 상품 객체 생성 후 콜백(onProductCreated) 및 window.GamzaListView.addProduct 호출
 */

(function () {
  'use strict';

  /**
   * 감자 마켓 테마의 귀여운 SVG Data URI 생성 헬퍼
   */
  function createSvgDataUri(svgString) {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString.trim());
  }

  // 기본 판매자(햇감자농부) 아바타 SVG Data URI
  const DEFAULT_SELLER_AVATAR = createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" rx="60" fill="#F4EFE6"/>
      <ellipse cx="60" cy="66" rx="34" ry="30" fill="#D4A373" stroke="#8D5B4C" stroke-width="4"/>
      <circle cx="48" cy="60" r="4" fill="#2C221E"/>
      <circle cx="72" cy="60" r="4" fill="#2C221E"/>
      <ellipse cx="42" cy="68" rx="5" ry="3" fill="#E5989B" opacity="0.7"/>
      <ellipse cx="78" cy="68" rx="5" ry="3" fill="#E5989B" opacity="0.7"/>
      <path d="M53 70 Q60 76 67 70" fill="none" stroke="#2C221E" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M60 36 C60 24, 74 22, 72 32 C70 22, 48 22, 60 36 Z" fill="#52B788" stroke="#2D6A4F" stroke-width="2.5"/>
    </svg>
  `);

  // 카테고리/샘플별 감자 마켓 일러스트 SVG 프리셋
  const SAMPLE_PRESETS = {
    default: {
      label: '기본 포근 감자박스',
      svg: createSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
          <rect width="400" height="300" fill="#F4EFE6"/>
          <circle cx="200" cy="145" r="95" fill="#FDFBF7" stroke="#E6DEC8" stroke-width="3"/>
          <!-- 박스 -->
          <rect x="130" y="145" width="140" height="75" rx="12" fill="#D4A373" stroke="#8D5B4C" stroke-width="4"/>
          <path d="M122 148 L200 122 L278 148" fill="#E6CCB2" stroke="#8D5B4C" stroke-width="4" stroke-linejoin="round"/>
          <!-- 귀여운 감자 캐릭터 -->
          <ellipse cx="200" cy="122" rx="42" ry="34" fill="#E9C46A" stroke="#8D5B4C" stroke-width="4"/>
          <circle cx="186" cy="116" r="4.5" fill="#2C221E"/>
          <circle cx="214" cy="116" r="4.5" fill="#2C221E"/>
          <ellipse cx="178" cy="124" rx="6" ry="3.5" fill="#E76F51" opacity="0.55"/>
          <ellipse cx="222" cy="124" rx="6" ry="3.5" fill="#E76F51" opacity="0.55"/>
          <path d="M192 126 Q200 133 208 126" fill="none" stroke="#2C221E" stroke-width="3.5" stroke-linecap="round"/>
          <text x="200" y="190" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#2C221E">감자마켓 추천템</text>
          <text x="200" y="268" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="600" fill="#6E5D54">따뜻한 동네 중고 거래</text>
        </svg>
      `)
    },
    digital: {
      label: '디지털/가전',
      svg: createSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
          <rect width="400" height="300" fill="#EFECE6"/>
          <rect x="115" y="65" width="170" height="115" rx="14" fill="#FFFFFF" stroke="#8D5B4C" stroke-width="5"/>
          <rect x="128" y="78" width="144" height="86" rx="6" fill="#F4EFE6"/>
          <circle cx="200" cy="121" r="22" fill="#D4A373" stroke="#8D5B4C" stroke-width="3"/>
          <circle cx="193" cy="117" r="3" fill="#2C221E"/>
          <circle cx="207" cy="117" r="3" fill="#2C221E"/>
          <path d="M195 125 Q200 130 205 125" fill="none" stroke="#2C221E" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M95 192 L305 192 L285 212 L115 212 Z" fill="#D4A373" stroke="#8D5B4C" stroke-width="4" stroke-linejoin="round"/>
          <text x="200" y="255" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#6E5D54">감자마켓 디지털기기</text>
        </svg>
      `)
    },
    living: {
      label: '가구/인테리어',
      svg: createSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
          <rect width="400" height="300" fill="#F6F1E9"/>
          <!-- 스탠드 조명 & 화분 -->
          <path d="M160 75 L240 75 L260 135 L140 135 Z" fill="#F4A261" stroke="#8D5B4C" stroke-width="4" stroke-linejoin="round"/>
          <line x1="200" y1="135" x2="200" y2="205" stroke="#8D5B4C" stroke-width="6"/>
          <rect x="165" y="205" width="70" height="14" rx="7" fill="#8D5B4C"/>
          <text x="200" y="258" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#6E5D54">포근한 인테리어 소품</text>
        </svg>
      `)
    },
    fashion: {
      label: '의류/잡화',
      svg: createSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
          <rect width="400" height="300" fill="#F7EFEA"/>
          <path d="M155 75 L180 65 L220 65 L245 75 L275 110 L250 132 L235 112 L235 205 L165 205 L165 112 L150 132 L125 110 Z" fill="#E09F7D" stroke="#8D5B4C" stroke-width="4" stroke-linejoin="round"/>
          <circle cx="200" cy="135" r="18" fill="#FDFBF7" opacity="0.85"/>
          <text x="200" y="140" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#8D5B4C">GAMZA</text>
          <text x="200" y="255" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#6E5D54">깨끗하게 보관한 의류</text>
        </svg>
      `)
    }
  };

  // 카테고리별 기본 이미지 매핑
  const CATEGORY_TO_PRESET_KEY = {
    '디지털기기': 'digital',
    '생활가전': 'digital',
    '가구/인테리어': 'living',
    '의류': 'fashion',
    '도서/티켓': 'default',
    '반려동물 용품': 'default',
    '기타': 'default'
  };

  const CATEGORIES = [
    '디지털기기',
    '가구/인테리어',
    '의류',
    '생활가전',
    '도서/티켓',
    '반려동물 용품',
    '기타'
  ];

  const GamzaWriteView = {
    _onProductCreated: null,
    _onCancel: null,
    _currentImageDataUrl: SAMPLE_PRESETS.default.svg,
    _isCustomFileUploaded: false,
    _selectedPresetKey: 'default',
    _initialized: false,

    /**
     * 글쓰기 화면 초기화
     * @param {Function} onProductCreated - 새 상품 등록 시 호출될 콜백 (newProduct 전달)
     * @param {Function} onCancel - 취소/뒤로가기 버튼 클릭 시 호출될 콜백
     */
    init: function (onProductCreated, onCancel) {
      if (typeof onProductCreated === 'function') {
        this._onProductCreated = onProductCreated;
      }
      if (typeof onCancel === 'function') {
        this._onCancel = onCancel;
      }

      this._ensureDomStructure();
      this._bindEvents();
      this._resetForm();
      this._initialized = true;
    },

    /**
     * 페이지 내 .write-view-section 또는 #writeViewSection 컨테이너를 찾아
     * 내부에 #writeForm이 없으면 표준 7개 필수 입력 폼 DOM을 렌더링합니다.
     */
    _ensureDomStructure: function () {
      let section =
        document.querySelector('.write-view-section') ||
        document.getElementById('writeViewSection') ||
        document.getElementById('screen3Write') ||
        document.getElementById('write-section');

      if (!section) {
        section = document.createElement('section');
        section.id = 'writeViewSection';
        section.className = 'write-view-section';
        section.hidden = true;
        const mainContainer =
          document.querySelector('main') ||
          document.getElementById('app') ||
          document.body;
        mainContainer.appendChild(section);
      } else if (!section.classList.contains('write-view-section')) {
        section.classList.add('write-view-section');
      }

      this._sectionEl = section;

      // 내부에 #writeForm이 아직 없다면 마크업 생성
      if (!section.querySelector('#writeForm')) {
        section.innerHTML = `
          <div class="write-header">
            <div class="write-header-left">
              <button type="button" id="cancelWriteBtn" class="btn-cancel-write" aria-label="목록으로 돌아가기">
                <span>←</span>
                <span>취소 / 목록으로</span>
              </button>
              <h2 class="write-header-title">내 물건 팔기 / 글쓰기</h2>
            </div>
            <span class="write-header-badge">🥔 감자마켓 동네거래</span>
          </div>

          <form id="writeForm" class="write-form-card" novalidate>
            <!-- 1. 상품 이미지 업로드 및 미리보기 -->
            <div class="form-group">
              <div class="form-label">
                <span class="form-label-left">1. 상품 이미지 <span class="required-dot">*</span></span>
                <span class="form-hint">미첨부 시 귀여운 감자 일러스트가 자동 적용됩니다</span>
              </div>
              <div class="image-upload-wrapper">
                <label class="image-upload-box" for="inputImage">
                  <input type="file" id="inputImage" accept="image/*" />
                  <span class="image-upload-icon">📷</span>
                  <span class="image-upload-text">내 PC에서<br/>사진 올리기</span>
                </label>

                <div class="image-preview-card" id="imagePreviewCard">
                  <img id="imagePreviewImg" src="${SAMPLE_PRESETS.default.svg}" alt="상품 이미지 미리보기" />
                  <span class="image-preview-badge" id="imagePreviewBadge">기본 샘플</span>
                  <button type="button" class="btn-reset-image" id="resetImageBtn" title="기본 이미지로 되돌리기" aria-label="이미지 초기화">✕</button>
                </div>

                <div class="sample-preset-panel">
                  <p class="sample-preset-title">사진이 없나요? 샘플 일러스트를 골라보세요</p>
                  <div class="sample-preset-list" id="samplePresetList">
                    <button type="button" class="btn-sample-preset active" data-preset="default">🥔 포근 감자박스</button>
                    <button type="button" class="btn-sample-preset" data-preset="digital">💻 디지털/가전</button>
                    <button type="button" class="btn-sample-preset" data-preset="living">🛋️ 인테리어 소품</button>
                    <button type="button" class="btn-sample-preset" data-preset="fashion">👕 의류/잡화</button>
                  </div>
                  <p class="sample-preset-notice">※ 사진을 직접 올리지 않아도 바로 등록을 테스트할 수 있어요.</p>
                </div>
              </div>
            </div>

            <!-- 2. 상품명 -->
            <div class="form-group">
              <label class="form-label" for="inputTitle">
                <span class="form-label-left">2. 상품명 <span class="required-dot">*</span></span>
                <span class="form-hint">무엇을 판매하시나요?</span>
              </label>
              <input
                type="text"
                id="inputTitle"
                class="form-input"
                placeholder="예) 아이패드 에어 5세대 64GB 스페이스 그레이 풀박스"
                maxlength="60"
                required
              />
            </div>

            <!-- 3. 카테고리 & 4. 가격 (2열 배치) -->
            <div class="form-row-2col">
              <div class="form-group">
                <label class="form-label" for="inputCategory">
                  <span class="form-label-left">3. 카테고리 <span class="required-dot">*</span></span>
                </label>
                <select id="inputCategory" class="form-select" required>
                  ${CATEGORIES.map((cat) => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="inputPrice">
                  <span class="form-label-left">4. 가격 <span class="required-dot">*</span></span>
                  <span class="form-hint">0원 입력 시 나눔</span>
                </label>
                <div class="price-input-wrapper">
                  <input
                    type="number"
                    id="inputPrice"
                    class="form-input"
                    placeholder="가격을 입력해 주세요"
                    min="0"
                    step="100"
                    required
                  />
                  <span class="price-unit-suffix">원</span>
                </div>
              </div>
            </div>

            <!-- 5. 자세한 설명 -->
            <div class="form-group">
              <label class="form-label" for="inputDescription">
                <span class="form-label-left">5. 자세한 설명 <span class="required-dot">*</span></span>
                <span class="form-hint">구매 시기, 사용감, 직거래 가능 시간 등을 적어주세요 (최대 500자)</span>
              </label>
              <textarea
                id="inputDescription"
                class="form-textarea"
                placeholder="동네 이웃이 안심하고 거래할 수 있도록 상품 상태(미개봉, 생활기스 여부 등)와 희망 거래 방식을 자세히 적어주세요. (최대 500자)"
                maxlength="500"
                aria-describedby="descCharCount"
                required
              ></textarea>
              <div id="descCharCount" class="form-char-count" aria-live="polite">
                <span id="descCurrentLength">0</span> / 500자
              </div>
            </div>

            <!-- 6. 거래 동네 -->
            <div class="form-group">
              <label class="form-label" for="inputLocation">
                <span class="form-label-left">6. 거래 동네 <span class="required-dot">*</span></span>
                <span class="form-hint">직거래를 희망하는 동네 이름</span>
              </label>
              <input
                type="text"
                id="inputLocation"
                class="form-input"
                placeholder="예) 감자구 알감자동"
                value="감자구 알감자동"
                required
              />
              <div class="location-quick-chips" id="locationQuickChips">
                <button type="button" class="btn-location-chip" data-location="감자구 알감자동">📍 감자구 알감자동</button>
                <button type="button" class="btn-location-chip" data-location="감자구 햇감자동">📍 감자구 햇감자동</button>
                <button type="button" class="btn-location-chip" data-location="감자구 통감자동">📍 감자구 통감자동</button>
                <button type="button" class="btn-location-chip" data-location="감자구 포슬동">📍 감자구 포슬동</button>
              </div>
            </div>

            <!-- 7. 판매 상태 -->
            <div class="form-group">
              <div class="form-label">
                <span class="form-label-left">7. 판매 상태 <span class="required-dot">*</span></span>
                <span class="form-hint">등록 시점의 상품 거래 상태를 선택해 주세요</span>
              </div>
              <div class="status-radio-group" role="radiogroup" aria-label="판매 상태 선택">
                <label class="status-radio-option">
                  <input type="radio" name="inputStatus" value="판매중" checked />
                  <span class="status-radio-label">
                    <span class="status-dot sale"></span>
                    <span>판매중</span>
                  </span>
                </label>
                <label class="status-radio-option">
                  <input type="radio" name="inputStatus" value="예약중" />
                  <span class="status-radio-label">
                    <span class="status-dot reserved"></span>
                    <span>예약중</span>
                  </span>
                </label>
                <label class="status-radio-option">
                  <input type="radio" name="inputStatus" value="거래 완료" />
                  <span class="status-radio-label">
                    <span class="status-dot sold"></span>
                    <span>거래 완료</span>
                  </span>
                </label>
              </div>
            </div>

            <div id="writeFormError" class="write-form-error" role="alert"></div>

            <!-- 하단 작성 완료 버튼 -->
            <div class="write-submit-area">
              <button type="submit" id="submitWriteBtn" class="btn-submit-write">
                작성 완료
              </button>
              <p class="write-memory-notice">
                🟢 등록된 상품은 Supabase 데이터베이스(products) 및 스토리지(product-images)에 영구 저장됩니다.
              </p>
            </div>
          </form>
        `;
      }
    },

    /**
     * 이벤트 리스너 바인딩 (중복 바인딩 방지)
     */
    _bindEvents: function () {
      const section = this._sectionEl;
      if (!section || section.dataset.writeBound === 'true') {
        return;
      }
      section.dataset.writeBound = 'true';

      const form = section.querySelector('#writeForm');
      const cancelBtn = section.querySelector('#cancelWriteBtn');
      const fileInput = section.querySelector('#inputImage') || section.querySelector('input[type="file"]');
      const resetImageBtn = section.querySelector('#resetImageBtn');
      const presetList = section.querySelector('#samplePresetList');
      const categorySelect = section.querySelector('#inputCategory');
      const locationChips = section.querySelector('#locationQuickChips');

      // 취소 / 뒤로가기 버튼
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          this.close();
          if (typeof this._onCancel === 'function') {
            this._onCancel();
          }
        });
      }

      // 파일 업로드 시 FileReader로 즉시 미리보기 표시
      if (fileInput) {
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;

          if (!file.type.startsWith('image/')) {
            this._showError('이미지 파일(JPG, PNG, GIF, WEBP 등)만 업로드할 수 있습니다.');
            fileInput.value = '';
            return;
          }

          const reader = new FileReader();
          reader.onload = (loadEvent) => {
            const resultUrl = loadEvent.target && loadEvent.target.result;
            if (typeof resultUrl === 'string') {
              this._currentImageDataUrl = resultUrl;
              this._isCustomFileUploaded = true;
              this._uploadedFile = file;
              this._updateImagePreviewUI(resultUrl, '업로드 사진');
              this._highlightPresetButton(null);
            }
          };
          reader.readAsDataURL(file);
        });
      }

      // 이미지 초기화 버튼
      if (resetImageBtn) {
        resetImageBtn.addEventListener('click', () => {
          if (fileInput) fileInput.value = '';
          this._isCustomFileUploaded = false;
          this._uploadedFile = null;
          this._applyPresetImage(this._selectedPresetKey || 'default');
        });
      }

      // 샘플 일러스트 프리셋 버튼 클릭
      if (presetList) {
        presetList.addEventListener('click', (e) => {
          const btn = e.target.closest('.btn-sample-preset');
          if (!btn) return;
          const presetKey = btn.getAttribute('data-preset') || 'default';
          if (fileInput) fileInput.value = '';
          this._isCustomFileUploaded = false;
          this._uploadedFile = null;
          this._applyPresetImage(presetKey);
        });
      }

      // 카테고리 변경 시 사용자가 별도 파일 업로드를 안 했다면 어울리는 기본 일러스트로 자동 전환
      if (categorySelect) {
        categorySelect.addEventListener('change', () => {
          if (!this._isCustomFileUploaded) {
            const matchedKey = CATEGORY_TO_PRESET_KEY[categorySelect.value] || 'default';
            this._applyPresetImage(matchedKey);
          }
        });
      }

      // 거래 동네 빠른 입력 칩
      if (locationChips) {
        locationChips.addEventListener('click', (e) => {
          const chip = e.target.closest('.btn-location-chip');
          if (!chip) return;
          const locationInput = section.querySelector('#inputLocation');
          if (locationInput) {
            locationInput.value = chip.getAttribute('data-location') || '';
            locationInput.focus();
          }
        });
      }

      // 자세한 설명 최대 500자 제한 및 실시간 글자 수 카운터
      const descInput = section.querySelector('#inputDescription');
      if (descInput) {
        descInput.addEventListener('input', () => {
          if (descInput.value.length > 500) {
            descInput.value = descInput.value.slice(0, 500);
          }
          descInput.setCustomValidity('');
          this._updateDescCounter(descInput.value.length);
        });
      }

      // 폼 제출 ([작성 완료])
      if (form) {
        form.addEventListener('submit', (event) => {
          event.preventDefault();
          this._handleSubmit();
        });
      }
    },

    /**
     * 자세한 설명 글자 수 카운터 UI 갱신 (최대 500자)
     */
    _updateDescCounter: function (length) {
      if (!this._sectionEl) return;
      const countEl = this._sectionEl.querySelector('#descCurrentLength');
      const wrapEl = this._sectionEl.querySelector('#descCharCount');
      const safeLen = Math.min(Math.max(0, Number(length) || 0), 500);
      if (countEl) {
        countEl.textContent = String(safeLen);
      }
      if (wrapEl) {
        wrapEl.classList.toggle('is-limit', safeLen >= 500);
      }
    },

    /**
     * 프리셋 샘플 이미지를 적용하고 UI를 갱신합니다.
     */
    _applyPresetImage: function (presetKey) {
      const preset = SAMPLE_PRESETS[presetKey] || SAMPLE_PRESETS.default;
      this._selectedPresetKey = SAMPLE_PRESETS[presetKey] ? presetKey : 'default';
      this._currentImageDataUrl = preset.svg;
      this._updateImagePreviewUI(preset.svg, preset.label);
      this._highlightPresetButton(this._selectedPresetKey);
    },

    /**
     * 미리보기 이미지 DOM 업데이트
     */
    _updateImagePreviewUI: function (src, badgeText) {
      if (!this._sectionEl) return;
      const previewImg = this._sectionEl.querySelector('#imagePreviewImg');
      const previewBadge = this._sectionEl.querySelector('#imagePreviewBadge');

      if (previewImg) {
        previewImg.src = src;
      }
      if (previewBadge && badgeText) {
        previewBadge.textContent = badgeText;
      }
    },

    /**
     * 활성화된 프리셋 버튼 스타일 표시
     */
    _highlightPresetButton: function (activeKey) {
      if (!this._sectionEl) return;
      const buttons = this._sectionEl.querySelectorAll('.btn-sample-preset');
      buttons.forEach((btn) => {
        if (activeKey && btn.getAttribute('data-preset') === activeKey) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    },

    /**
     * 에러 메시지 표시 / 숨김
     */
    _showError: function (message) {
      if (!this._sectionEl) return;
      const errorEl = this._sectionEl.querySelector('#writeFormError');
      if (!errorEl) return;

      if (message) {
        errorEl.textContent = '⚠️ ' + message;
        errorEl.classList.add('visible');
      } else {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
    },

    /**
     * 폼 제출 처리 및 새 상품 객체 생성
     */
    _handleSubmit: function () {
      const section = this._sectionEl;
      if (!section) return;

      const titleEl = section.querySelector('#inputTitle');
      const categoryEl = section.querySelector('#inputCategory');
      const priceEl = section.querySelector('#inputPrice');
      const descEl = section.querySelector('#inputDescription');
      const locationEl = section.querySelector('#inputLocation');
      const statusRadio = section.querySelector('input[name="inputStatus"]:checked');
      const statusSelect = section.querySelector('#inputStatus');

      const title = titleEl ? titleEl.value.trim() : '';
      const category = categoryEl ? categoryEl.value.trim() : '기타';
      const rawPrice = priceEl ? priceEl.value.trim() : '';
      const description = descEl ? descEl.value.trim() : '';
      const location = locationEl ? locationEl.value.trim() : '';
      const status = statusRadio
        ? statusRadio.value
        : statusSelect
        ? statusSelect.value
        : '판매중';

      // 필수 입력 검증
      if (!title) {
        this._showError('상품명을 입력해 주세요.');
        if (titleEl) titleEl.focus();
        return;
      }

      if (rawPrice === '' || isNaN(Number(rawPrice)) || Number(rawPrice) < 0) {
        this._showError('올바른 가격(0원 이상 숫자)을 입력해 주세요.');
        if (priceEl) priceEl.focus();
        return;
      }

      if (!description) {
        this._showError('상품에 대한 자세한 설명을 입력해 주세요.');
        if (descEl) descEl.focus();
        return;
      }

      if (description.length > 500) {
        this._showError('자세한 설명은 최대 500자까지 입력할 수 있습니다.');
        if (descEl) descEl.focus();
        return;
      }

      if (!location) {
        this._showError('거래 희망 동네를 입력해 주세요. (예: 감자구 알감자동)');
        if (locationEl) locationEl.focus();
        return;
      }

      this._showError('');

      const priceNumber = Math.floor(Number(rawPrice));
      const finalImage = this._currentImageDataUrl || SAMPLE_PRESETS.default.svg;
      const currentUser =
        window.GamzaAuth && typeof window.GamzaAuth.getCurrentUser === 'function'
          ? window.GamzaAuth.getCurrentUser()
          : null;
      const currentSellerId = currentUser && currentUser.id ? currentUser.id : null;
      const currentSellerNickname =
        currentUser && currentUser.nickname ? currentUser.nickname : '햇감자농부';
      const currentSellerAvatar =
        (currentUser && currentUser.avatar) ||
        (window.GamzaListView && typeof window.GamzaListView.createAvatarSvgDataUri === 'function'
          ? window.GamzaListView.createAvatarSvgDataUri(currentSellerNickname, '#F3E9E4', '#C6956E')
          : DEFAULT_SELLER_AVATAR);

      // 새 상품 객체 생성 (화면 1, 화면 2와 완벽히 호환되는 필드 구성)
      const newProduct = {
        id: Date.now(),
        title: title,
        category: category,
        price: priceNumber,
        description: description,
        location: location,
        region: location,
        status: status,
        image: finalImage,
        imageUrl: finalImage,
        thumbnail: finalImage,
        rawFile: this._isCustomFileUploaded ? this._uploadedFile : null,
        presetKey: this._isCustomFileUploaded ? null : (this._selectedPresetKey || 'default'),
        timeAgo: '방금 전',
        createdAt: '방금 전',
        likes: 0,
        chats: 0,
        views: 1,
        sellerId: currentSellerId,
        seller: {
          id: currentSellerId,
          nickname: currentSellerNickname,
          avatar: currentSellerAvatar,
          region: location,
          mannerTemp: '39.5°C'
        }
      };

      const submitBtn = section.querySelector('#submitWriteBtn');
      if (window.GamzaSupabase && typeof window.GamzaSupabase.createProduct === 'function') {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = '🥔 수파베이스에 저장 중...';
        }
        window.GamzaSupabase.createProduct(newProduct)
          .then((savedProduct) => {
            const productToRender = savedProduct || newProduct;
            if (typeof this._onProductCreated === 'function') {
              this._onProductCreated(productToRender);
            } else if (
              window.GamzaListView &&
              typeof window.GamzaListView.addProduct === 'function'
            ) {
              window.GamzaListView.addProduct(productToRender);
            }
            this._resetForm();
            this.close();
          })
          .catch((err) => {
            console.error('[GamzaSupabase] 상품 등록 실패:', err);
            this._showError('수파베이스 저장 중 오류가 발생했습니다: ' + (err.message || '네트워크 오류'));
          })
          .finally(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = '작성 완료';
            }
          });
        return;
      }

      // 콜백 또는 window.GamzaListView.addProduct 호출 (중복 추가 방지)
      if (typeof this._onProductCreated === 'function') {
        this._onProductCreated(newProduct);
      } else if (
        window.GamzaListView &&
        typeof window.GamzaListView.addProduct === 'function'
      ) {
        window.GamzaListView.addProduct(newProduct);
      }

      // 폼 초기화 및 화면 닫기 (목록 화면으로 복귀)
      this._resetForm();
      this.close();
    },

    /**
     * 입력 폼을 초기 상태로 리셋
     */
    _resetForm: function () {
      if (!this._sectionEl) return;
      const form = this._sectionEl.querySelector('#writeForm');
      if (form) {
        form.reset();
      }

      const locationEl = this._sectionEl.querySelector('#inputLocation');
      if (locationEl && !locationEl.value) {
        locationEl.value = '감자구 알감자동';
      }

      const defaultStatusRadio = this._sectionEl.querySelector(
        'input[name="inputStatus"][value="판매중"]'
      );
      if (defaultStatusRadio) {
        defaultStatusRadio.checked = true;
      }

      this._isCustomFileUploaded = false;
      this._uploadedFile = null;
      this._applyPresetImage('default');
      this._updateDescCounter(0);
      this._showError('');
    },

    /**
     * 글쓰기 화면 열기
     */
    open: function () {
      if (!this._initialized) {
        this.init(this._onProductCreated, this._onCancel);
      }
      if (window.GamzaListView && typeof window.GamzaListView.hide === 'function') {
        window.GamzaListView.hide();
      } else {
        const listViewEl = document.getElementById('listView') || document.getElementById('screen1List');
        if (listViewEl) listViewEl.classList.add('hidden');
      }
      if (this._sectionEl) {
        this._sectionEl.hidden = false;
        this._sectionEl.classList.remove('hidden');
        this._sectionEl.style.display = '';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const titleInput = this._sectionEl && this._sectionEl.querySelector('#inputTitle');
      if (titleInput) {
        setTimeout(() => titleInput.focus(), 80);
      }
    },

    /**
     * 글쓰기 화면 닫기
     */
    close: function () {
      if (this._sectionEl) {
        this._sectionEl.hidden = true;
        this._sectionEl.classList.add('hidden');
      }
      if (window.GamzaListView && typeof window.GamzaListView.show === 'function') {
        window.GamzaListView.show();
      } else {
        const listViewEl = document.getElementById('listView') || document.getElementById('screen1List');
        if (listViewEl) listViewEl.classList.remove('hidden');
      }
    }
  };

  window.GamzaWriteView = GamzaWriteView;
})();
