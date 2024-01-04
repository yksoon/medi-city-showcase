# Medi-City Showcase 성형외과 박람회
- Medi-City에서 주관하는 성형외과 박람회 페이지.

링크 : [showcase.medi-city.co.kr](https://showcase.medi-city.co.kr/)

## 특징
- Medi-City 기존의 ReactJS 프로젝트를 고도화 하여 작업 진행.
- 퍼포먼스 및 유지보수 측면에서 기존 프로젝트보다 더욱 나은 환경 제공.
- module화 및 템플릿화 진행.
- 인도네시아, 대한민국 사전등록에 대해 별도로 진행.
- 행사의 전반적인 스케줄 및 정보를 DB를 활용하여 여러 component에서 사용.

## 개발 환경 및 사용 툴
- 백엔드 : JAVA
- 백엔드 프레임워크 : Springboot
- 프론트엔드 : Javascript
- 프론트엔드 프레임워크 : ReactJS, Vite (컴파일러)
- Server : Linux (CentOS), Apache
- 상태관리 라이브러리 : Recoil

## 작업기간
- 2023.11 ~ 2023.12

## 구동 사진
![쇼케이스 메인](https://github.com/yksoon/medi-city-showcase/assets/62881936/0fbd6ba0-5244-4172-9c0b-41934ab28c8e)
![쇼케이스 갤러리](https://github.com/yksoon/medi-city-showcase/assets/62881936/c68edf95-1adc-493f-8f27-fcc5e1cf5912)
![쇼케이스 아티스트](https://github.com/yksoon/medi-city-showcase/assets/62881936/815b857b-cdd5-4226-aaef-9f7de4feef84)

## 구현 설명
- 아티스트 상세 페이지에서 아티스트의 갤러리 사진의 preview를 위해 Slider 라이브러리를 이용. 커스텀화 진행.
- 이미지 파일의 용량문제로 인한 퍼포먼스 저하로 썸네일 변환 로직 사용 및 module화 진행.
- 로딩 퍼포먼스를 고려하여 Lazy Loading 적용.
- Client / Admin 페이지가 하나의 프로젝트로 진행하여 Router 구성 및 Login Token 구현.

## 느낀점
- 사용자의 퍼포먼스를 더 고려하여 설계를 진행 하였고, 이에따른 만족스러운 결과를 가져옴.
- 스케줄의 DB화로 인해 정보 수정 시 render 페이지를 수정하지 않고, 관리자 페이지에서 한번에 수정이 가능한 장점이 있다.
- 공통된 UI 및 Component는 탬플릿화가 가능할 것 같지만 생각보다 많은 정리와 parameter 정규화가 필요할 것 같다.
