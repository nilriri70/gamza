/**
 * [화면 2: 상품 상세 팝업(모달)] - screen2_modal.js
 * 중고 거래 웹 서비스 '감자(Gamza)' 상세 모달 제어 모듈
 */
(function () {
  'use strict';

  const DEFAULT_PRODUCT_IMAGE =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
        <rect width="600" height="450" fill="#F4EFE6"/>
        <circle cx="300" cy="200" r="68" fill="#E6DEC8"/>
        <ellipse cx="300" cy="200" rx="52" ry="40" fill="#D9A05B" opacity="0.65"/>
        <text x="300" y="305" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="600" fill="#6E5D54">감자 마켓 상품 이미지</text>
      </svg>`
    );

  const DEFAULT_AVATAR_IMAGE =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
        <rect width="80" height="80" rx="40" fill="#F4EFE6"/>
        <circle cx="40" cy="31" r="14" fill="#8D5B4C" opacity="0.85"/>
        <path d="M18 68c4-14 14-21 22-21s18 7 22 21" fill="#8D5B4C" opacity="0.85"/>
      </svg>`
    );

  const GamzaDetailModal = {
    dialog: null,
    currentProduct: null,
    wishedProductIds: new Set(),
    _initialized: false,
    _toastTimer: null,

    /**
     * 모달 초기화: DOM 구조 확인/보강 및 이벤트 바인딩
     */
    init() {
      const dialog = this._ensureDialogDOM();
      if (!dialog) return;

      this.dialog = dialog;

      if (this._initialized && dialog.dataset.gamzaModalBound === 'true') {
        return;
      }

      // closedby="any" 및 접근성 속성 보장
      if (!dialog.hasAttribute('closedby')) {
        dialog.setAttribute('closedby', 'any');
      }
      if (!dialog.hasAttribute('aria-labelledby')) {
        dialog.setAttribute('aria-labelledby', 'modalProductTitle');
      }

      // 닫기 버튼 이벤트 연결
      const closeBtn = dialog.querySelector('#closeModalBtn, .modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.close();
        });
      }

      // Modern Web Guidance 필수 폴백: <dialog closedby="any"> 미지원 브라우저용 Light-dismiss
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        dialog.addEventListener('click', (event) => {
          if (event.target !== dialog) return;
          const rect = dialog.getBoundingClientRect();
          const isDialogContent = (
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
          );
          if (isDialogContent) return;
          dialog.close();
        });
      }

      // 하단 [관심 추가] 버튼 피드백 이벤트
      const wishBtn = dialog.querySelector('#modalWishBtn, .modal-wish-btn');
      if (wishBtn) {
        wishBtn.addEventListener('click', () => {
          this._handleToggleWish(wishBtn);
        });
      }

      // 하단 [채팅 시작하기] 버튼 피드백 이벤트
      const chatBtn = dialog.querySelector('#modalChatBtn, .modal-chat-btn');
      if (chatBtn) {
        chatBtn.addEventListener('click', () => {
          this._handleStartChat();
        });
      }

      dialog.dataset.gamzaModalBound = 'true';
      this._initialized = true;
    },

    /**
     * 전달받은 상품 데이터를 모달 DOM에 렌더링하고 showModal()로 오픈
     * @param {Object} product - 상품 객체 (id, title, category, location, timeAgo, price, status, description, image, seller)
     */
    open(product) {
      if (!product) return;
      this.init();
      if (!this.dialog) return;

      this.currentProduct = product;
      const dialog = this.dialog;

      // 1. 상단 상품 이미지 렌더링
      const imgSection = dialog.querySelector('.modal-image-section');
      let imgEl = dialog.querySelector('#modalProductImage, .modal-product-image, .modal-image-section img');
      if (!imgEl && imgSection) {
        imgEl = document.createElement('img');
        imgEl.id = 'modalProductImage';
        imgEl.className = 'modal-product-image';
        imgSection.prepend(imgEl);
      }
      if (imgEl) {
        const imgSrc = product.image || product.imageUrl || product.thumbnail || DEFAULT_PRODUCT_IMAGE;
        imgEl.onerror = () => {
          imgEl.onerror = null;
          imgEl.src = DEFAULT_PRODUCT_IMAGE;
        };
        imgEl.src = imgSrc;
        imgEl.alt = product.title ? `${product.title} 상품 이미지` : '상품 이미지';
      }

      // 2. 판매자 정보 박스 렌더링 (.seller-profile-box)
      const sellerData = this._extractSellerInfo(product);
      const avatarEl = dialog.querySelector('#modalSellerAvatar, .seller-avatar');
      if (avatarEl) {
        if (avatarEl.tagName === 'IMG') {
          avatarEl.onerror = () => {
            avatarEl.onerror = null;
            avatarEl.src = DEFAULT_AVATAR_IMAGE;
          };
          avatarEl.src = sellerData.avatar || DEFAULT_AVATAR_IMAGE;
          avatarEl.alt = `${sellerData.nickname} 프로필`;
        } else {
          // div 또는 span 요소인 경우
          if (sellerData.avatar && (sellerData.avatar.startsWith('http') || sellerData.avatar.startsWith('data:') || sellerData.avatar.startsWith('/') || sellerData.avatar.startsWith('.'))) {
            avatarEl.innerHTML = `<img src="${this._escapeAttr(sellerData.avatar)}" alt="${this._escapeAttr(sellerData.nickname)} 프로필" />`;
            const innerImg = avatarEl.querySelector('img');
            if (innerImg) {
              innerImg.onerror = () => {
                innerImg.onerror = null;
                innerImg.src = DEFAULT_AVATAR_IMAGE;
              };
            }
          } else {
            avatarEl.textContent = sellerData.emoji || '🥔';
          }
        }
      }

      const nicknameEl = dialog.querySelector('#modalSellerNickname, #modalSellerName, .seller-nickname');
      if (nicknameEl) {
        nicknameEl.textContent = sellerData.nickname;
      }

      const regionEl = dialog.querySelector('#modalSellerRegion, #modalSellerLocation, .seller-region');
      if (regionEl) {
        regionEl.textContent = sellerData.region;
      }

      // 3. 상품 핵심 정보 7가지 (순서 엄수: 상태 배지 -> 카테고리 -> 상품명 -> 판매 위치 -> 업로드 시간 -> 가격 -> 상품 설명)
      // (1) 판매 상태 배지 (.status-badge)
      const statusEl = dialog.querySelector('#modalStatusBadge, .modal-body-section .status-badge, .status-badge');
      const statusMeta = this._resolveStatus(product.status);
      if (statusEl) {
        statusEl.textContent = statusMeta.label;
        statusEl.classList.remove('status-sale', 'status-reserved', 'status-sold');
        statusEl.classList.add('status-badge', statusMeta.className);
      }

      // (2) 카테고리 (.modal-category)
      const categoryEl = dialog.querySelector('#modalCategory, .modal-category');
      if (categoryEl) {
        categoryEl.textContent = product.category || '기타 중고물품';
      }

      // (3) 상품명 (#modalProductTitle, .modal-title)
      const titleEl = dialog.querySelector('#modalProductTitle, .modal-title');
      if (titleEl) {
        titleEl.textContent = product.title || '상품명이 없습니다';
      }

      // (4) 판매 위치 (.modal-location)
      const locationEl = dialog.querySelector('#modalLocation, .modal-location');
      if (locationEl) {
        locationEl.textContent = product.location || sellerData.region || '동네 정보 없음';
      }

      // (5) 업로드 시간 (.modal-time)
      const timeEl = dialog.querySelector('#modalTime, .modal-time');
      if (timeEl) {
        timeEl.textContent = product.timeAgo || product.createdAt || product.time || '방금 전';
      }

      // (6) 가격 (.modal-price)
      const priceEl = dialog.querySelector('#modalPrice, .modal-price');
      if (priceEl) {
        priceEl.textContent = this._formatPrice(product.price);
      }

      // (7) 상품 설명 (.modal-description)
      const descEl = dialog.querySelector('#modalDescription, .modal-description');
      if (descEl) {
        descEl.textContent =
          product.description ||
          '판매자가 등록한 상세 설명이 없습니다. 채팅을 통해 상품 상태를 문의해 보세요.';
      }

      // 4. 하단 버튼 상태 동기화
      this._syncFooterButtons(product, statusMeta);

      // 스크롤 최상단 초기화
      const bodySection = dialog.querySelector('.modal-body-section');
      if (bodySection) {
        bodySection.scrollTop = 0;
      }

      // 모달 오픈
      if (!dialog.open) {
        dialog.showModal();
      }
    },

    /**
     * 모달 닫기
     */
    close() {
      if (!this.dialog) {
        this.dialog = document.getElementById('detailDialog');
      }
      if (this.dialog && this.dialog.open) {
        this.dialog.close();
      }
    },

    /**
     * #detailDialog 요소와 내부 필수 마크업이 없을 경우 자동 생성/보강
     */
    _ensureDialogDOM() {
      let dialog = document.getElementById('detailDialog') || document.querySelector('dialog.detail-dialog');

      if (!dialog) {
        dialog = document.createElement('dialog');
        dialog.id = 'detailDialog';
        dialog.className = 'detail-dialog';
        dialog.setAttribute('closedby', 'any');
        dialog.setAttribute('aria-labelledby', 'modalProductTitle');
        document.body.appendChild(dialog);
      }

      // 내부 필수 섹션(.modal-body-section 등)이 비어 있으면 표준 템플릿 주입
      const hasBodySection = Boolean(dialog.querySelector('.modal-body-section'));
      if (!hasBodySection) {
        dialog.innerHTML = `
          <button type="button" id="closeModalBtn" class="modal-close-btn" aria-label="상세 창 닫기">✕</button>

          <div class="modal-image-section">
            <img id="modalProductImage" class="modal-product-image" src="${DEFAULT_PRODUCT_IMAGE}" alt="상품 이미지" />
          </div>

          <div class="modal-body-section">
            <!-- 1. 판매자 정보 박스 -->
            <div class="seller-profile-box">
              <div id="modalSellerAvatar" class="seller-avatar" aria-hidden="true">🥔</div>
              <div class="seller-info-text">
                <span id="modalSellerNickname" class="seller-nickname">감자이웃</span>
                <span id="modalSellerRegion" class="seller-region">온의동</span>
              </div>
            </div>

            <!-- 2. 상품 핵심 정보 (순서 엄수: 상태 배지 -> 카테고리 -> 상품명 -> 판매 위치 -> 업로드 시간 -> 가격 -> 상품 설명) -->
            <span id="modalStatusBadge" class="status-badge status-sale">판매중</span>
            <span id="modalCategory" class="modal-category">생활가전</span>
            <h2 id="modalProductTitle" class="modal-title">상품 제목</h2>
            <div id="modalLocation" class="modal-location">강원도 춘천시 온의동</div>
            <div id="modalTime" class="modal-time">10분 전</div>
            <div id="modalPrice" class="modal-price">15,000원</div>
            <p id="modalDescription" class="modal-description">상품 상세 설명입니다.</p>
          </div>

          <!-- 3. 맨 아래 하단 고정 바 -->
          <div class="modal-footer-actions">
            <button type="button" id="modalWishBtn" class="modal-wish-btn" aria-pressed="false">
              🤍 관심 추가
            </button>
            <button type="button" id="modalChatBtn" class="modal-chat-btn">
              💬 채팅 시작하기
            </button>
          </div>

          <div id="modalFeedbackToast" class="modal-feedback-toast" role="status" aria-live="polite"></div>
        `;
      } else if (!dialog.querySelector('.modal-feedback-toast')) {
        const toast = document.createElement('div');
        toast.id = 'modalFeedbackToast';
        toast.className = 'modal-feedback-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        dialog.appendChild(toast);
      }

      return dialog;
    },

    /**
     * 판매자 정보 정규화 추출
     */
    _extractSellerInfo(product) {
      const seller = product.seller;
      if (seller && typeof seller === 'object') {
        return {
          nickname: seller.nickname || seller.name || product.sellerNickname || '따뜻한 감자이웃',
          region: seller.region || seller.location || product.location || '우리 동네',
          avatar: seller.avatar || seller.profileImage || seller.image || '',
          emoji: seller.emoji || '🥔'
        };
      }
      return {
        nickname:
          (typeof seller === 'string' && seller) ||
          product.sellerNickname ||
          product.sellerName ||
          '따뜻한 감자이웃',
        region: product.sellerRegion || product.location || '우리 동네',
        avatar: product.sellerAvatar || '',
        emoji: '🥔'
      };
    },

    /**
     * 판매 상태 값에 따른 라벨 및 스타일 클래스 반환
     */
    _resolveStatus(rawStatus) {
      const normalized = String(rawStatus || '판매중').trim().toLowerCase();

      if (
        normalized === '예약중' ||
        normalized === 'reserved' ||
        normalized === 'reserving'
      ) {
        return { label: '예약중', className: 'status-reserved', isSold: false };
      }

      if (
        normalized === '거래 완료' ||
        normalized === '거래완료' ||
        normalized === '판매완료' ||
        normalized === '판매 완료' ||
        normalized === 'sold' ||
        normalized === 'completed'
      ) {
        return { label: '거래 완료', className: 'status-sold', isSold: true };
      }

      return { label: '판매중', className: 'status-sale', isSold: false };
    },

    /**
     * 가격 포맷팅 (예: 15,000원 또는 무료나눔)
     */
    _formatPrice(price) {
      if (price === 0 || price === '0' || price === '무료나눔' || price === '무료') {
        return '무료나눔';
      }
      if (price === null || price === undefined || price === '') {
        return '가격 문의';
      }
      if (typeof price === 'number' && !Number.isNaN(price)) {
        return `${price.toLocaleString('ko-KR')}원`;
      }
      const strPrice = String(price).trim();
      const numericOnly = strPrice.replace(/[,원\s]/g, '');
      if (/^\d+$/.test(numericOnly)) {
        const num = Number(numericOnly);
        return num === 0 ? '무료나눔' : `${num.toLocaleString('ko-KR')}원`;
      }
      return strPrice;
    },

    /**
     * 하단 관심 추가 / 채팅 시작하기 버튼 상태 업데이트
     */
    _syncFooterButtons(product, statusMeta) {
      if (!this.dialog) return;

      const wishBtn = this.dialog.querySelector('#modalWishBtn, .modal-wish-btn');
      if (wishBtn) {
        const productKey = product.id ?? product.title;
        const isWished = Boolean(product.isWished) || this.wishedProductIds.has(productKey);
        wishBtn.classList.toggle('is-wished', isWished);
        wishBtn.setAttribute('aria-pressed', String(isWished));
        wishBtn.innerHTML = isWished ? '❤️ 관심 등록됨' : '🤍 관심 추가';
      }

      const chatBtn = this.dialog.querySelector('#modalChatBtn, .modal-chat-btn');
      if (chatBtn) {
        if (statusMeta.isSold) {
          chatBtn.disabled = true;
          chatBtn.textContent = '거래가 완료된 상품입니다';
        } else {
          chatBtn.disabled = false;
          chatBtn.innerHTML = '💬 채팅 시작하기';
        }
      }
    },

    /**
     * [관심 추가] 클릭 피드백 처리
     */
    _handleToggleWish(wishBtn) {
      if (!this.currentProduct) return;
      const productKey = this.currentProduct.id ?? this.currentProduct.title;
      const willWish = !this.wishedProductIds.has(productKey);

      if (willWish) {
        this.wishedProductIds.add(productKey);
        this.currentProduct.isWished = true;
        wishBtn.classList.add('is-wished');
        wishBtn.setAttribute('aria-pressed', 'true');
        wishBtn.innerHTML = '❤️ 관심 등록됨';
        this._showToast('관심 목록에 추가했어요 🥔');
      } else {
        this.wishedProductIds.delete(productKey);
        this.currentProduct.isWished = false;
        wishBtn.classList.remove('is-wished');
        wishBtn.setAttribute('aria-pressed', 'false');
        wishBtn.innerHTML = '🤍 관심 추가';
        this._showToast('관심 목록에서 해제했어요');
      }
    },

    /**
     * [채팅 시작하기] 클릭 피드백 처리
     */
    _handleStartChat() {
      if (!this.currentProduct) return;
      const seller = this._extractSellerInfo(this.currentProduct);
      this._showToast(`'${seller.nickname}'님과의 감자톡 채팅방을 준비 중입니다 💬`);
    },

    /**
     * 모달 내 가벼운 토스트 피드백 표시
     */
    _showToast(message) {
      if (!this.dialog) return;
      const toast = this.dialog.querySelector('#modalFeedbackToast, .modal-feedback-toast');
      if (!toast) return;

      toast.textContent = message;
      toast.classList.add('show');

      if (this._toastTimer) {
        clearTimeout(this._toastTimer);
      }
      this._toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 2200);
    },

    _escapeAttr(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  };

  // 전역 객체 노출
  window.GamzaDetailModal = GamzaDetailModal;

  // DOM 로드 시 자동 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => GamzaDetailModal.init());
  } else {
    GamzaDetailModal.init();
  }
})();
