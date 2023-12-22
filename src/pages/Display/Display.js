import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import {
  PlusOutlined,
  GlobalOutlined,
  PhoneOutlined,
  MailOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SaveOutlined,
  CloseOutlined,
  EyeOutlined,
  SendOutlined,
  BankOutlined,
  WalletOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import classNames from "classnames/bind";
import styles from "./styleDisplay.module.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "react-uuid";
import avatar from "@assets/images/linhdu.png";

// Ngân hàng
import VIETCOMBANKIMG from "@assets/images/VIETCOMBANK.png";
import VIETTINBANKIMG from "@assets/images/VIETTINBANK.png";
import BIDVIMG from "@assets/images/BIDV.png";
import TECHCOMBANKIMG from "@assets/images/TECHCOMBANK.png";
import ANGRIBANKIMG from "@assets/images/ANGRIBANK.png";
import MBBANKIMG from "@assets/images/MBBANK.png";
import MSBBANKIMG from "@assets/images/MSBBANK.png";
import ACBBANKIMG from "@assets/images/ACBBANK.png";
import SACOMBANKIMG from "@assets/images/SACOMBANK.png";
import TPBANKIMG from "@assets/images/TPBANK.png";
import VPBANKIMG from "@assets/images/VPBANK.png";
import VIBBANKIMG from "@assets/images/VIBBANK.png";
// ví điện tử
import MOMOIMG from "@assets/images/momo.png";
import PAYPALIMG from "@assets/images/paypal.png";
import SHOPEEPAYIMG from "@assets/images/shopeepay.png";
import ZALOPAYIMG from "@assets/images/zalopay.png";
// mạng lưới crypto
import BEP20 from "@assets/images/bep20.png";
import TRC20 from "@assets/images/trc20.png";
import ER20 from "@assets/images/er20.png";

//
import { listIconFa } from "utils/listIcon";

import * as Icons from "react-icons/fa";
import Loader from "components/loading/Loader";
import UserServices from "services/user-service/UserService";
import { AuthContext } from "context/AuthContext";
import ViewDisplay from "./ViewDisplay/ViewDisplay";
import { ToastContainer, toast } from "react-toastify";
import AvatarEditor from "react-avatar-editor";
import CardTemplate from "components/card/CardTemplate";
import { templates } from "utils/template";
const cx = classNames.bind(styles);
const Display = () => {
  const { authState, loadUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [formHeader] = Form.useForm();
  const [itemSelected, setItemSelected] = useState(null);
  const [titleModal, setTitleModal] = useState("Thêm khối");
  useEffect(() => {
    setContent(
      authState.user.content ? JSON.parse(authState.user.content) : []
    );
    setBaseURL(authState.user.avatar);
    setPreViewAvatar(authState.user.avatar);
    setNickName(authState.user.nickName);
    setUserName(authState.user.userName);
    setDescription(
      authState.user.description ? authState.user.description : "How about you?"
    );
    // eslint-disable-next-line
    const dataTemp = templates.find(
      (item) => item.id == authState.user.templates
    );
    if (dataTemp) {
      setTemplate(dataTemp);
    }
    setIsLoading(false);
  }, [authState]);
  const [isLoading, setIsLoading] = useState(true);
  const [uuidItem, setUuidItem] = useState("");
  // state header send
  const [nickName, setNickName] = useState("");
  const [userName, setUserName] = useState("");

  const [description, setDescription] = useState("");
  // state change header
  const [nickNameChange, setNickNameChange] = useState("");
  const [descriptionChange, setDescriptionChange] = useState("");
  const [userNameChange, setUserNameChange] = useState("");
  const [baseURL, setBaseURL] = useState("");
  //
  const [activeIcon, setActiveIcon] = useState("");
  // Loại khối: Website, sms, email
  const [typeBlock, setTypeBlock] = useState("website");
  // Tên hiển thị: FACEBOOK, INSTAGRAM
  const [nameBlock, setNameBlock] = useState("");
  // link website || email || số điện thoại
  const [linkBlock, setLinkBlock] = useState("");
  //State nội dung tin nhắn và chủ đề email
  const [contentBlock, setContentBlock] = useState("");
  const [isModalDelete, setIsModalDelete] = useState(false);

  //State ngân hàng
  const [bankType, setBankType] = useState("VIETCOMBANK");
  const [bankNumber, setBankNumber] = useState("");
  //State ví điện tử
  const [walletDigitalType, setWalletDigitalType] = useState("MOMO");
  const [linkWalletDigital, setLinkWalletDigital] = useState("");
  //State tiền ảo
  const [cryptoType, setCryptoType] = useState("BEP2");
  const [cryptoAddress, setCryptoAddress] = useState("");
  //state open modal edit avatar
  const [isModalEditAvatar, setIsModalEditAvatar] = useState(false);

  // open modal bật chọn background
  const [isModalTemplate, setIsModalTemplate] = useState(false);

  const [previewAvatar, setPreViewAvatar] = useState("");
  const cropRef = useRef(null);
  const [personInfo, setPersonInfo] = useState({
    link: "",
    email: "",
    phone: "",
    name: "",
    lastname: "",
  });
  const [orgInfo, setOrgInfo] = useState({
    position: "",
    email: "",
    phone: "",
    name: "",
  });
  const handlePersonInput = (name, value) => {
    setPersonInfo({ ...personInfo, [name]: value });
  };
  const handleOrgInput = (name, value) => {
    setOrgInfo({ ...orgInfo, [name]: value });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalHeaderOpen, setIsModalHeaderOpen] = useState(false);
  const [isModalOpenViewDisplay, setIsModalOpenViewDisplay] = useState(false);

  // template
  const [template, setTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const showModalHeader = () => {
    setIsModalHeaderOpen(true);
  };

  // Open modal thay đổi nick name và mô tả
  const handleOkHeader = () => {
    setNickName(nickNameChange);
    setDescription(descriptionChange);
    setUserName(userNameChange);
    formHeader.resetFields();
    setIsModalHeaderOpen(false);
  };
  const handleCancelHeader = () => {
    formHeader.resetFields();
    setNickNameChange("");
    setDescriptionChange("");
    setIsModalHeaderOpen(false);
  };
  // state content
  const [content, setContent] = useState([]);
  const handleShowModalDisplay = () => {
    setIsModalOpenViewDisplay(!isModalOpenViewDisplay);
  };
  const showModal = (titleModal, item) => {
    setTitleModal(titleModal);
    setIsModalOpen(true);
    if (titleModal === "Thêm khối") {
      form.setFieldsValue({
        block_name: "",
        block_type: "website",
        block_link: "",
      });
    } else {
      setUuidItem(item.uuid);
      setTypeBlock(item.typeBlock);

      if (item.typeBlock === "website" || item.typeBlock === "phone") {
        form.setFieldsValue({
          block_name: item.name,
          block_type: item.typeBlock,
          block_link: item.typeBlock === "website" ? item.link : item.phone,
        });
        setActiveIcon(item?.icon);
      }
      if (item.typeBlock === "send_sms" || item.typeBlock === "send_email") {
        form.setFieldsValue({
          block_name: item.name,
          block_type: item.typeBlock,
          linkBlock:
            item.typeBlock === "send_email" ? item?.email : item?.phone,
          contentBlock: item?.content,
        });
        setActiveIcon(item?.icon);
      }
      if (item.typeBlock === "save_contact") {
        form.setFieldsValue({
          block_name: item.name,
          block_type: item.typeBlock,
          link: item.personInfo.link,
          email: item.personInfo.email,
          phone: item.personInfo.phone,
          name: item.personInfo.name,
          lastname: item.personInfo.link,
          position: item.orgInfo.position,
          email_org: item.orgInfo.email,
          phone_org: item.orgInfo.phone,
          name_org: item.orgInfo.name,
        });
        setActiveIcon(item?.icon);
      }
      if (item.typeBlock === "bank") {
        form.setFieldsValue({
          block_name: item.name,
          block_type: item.typeBlock,
          bank_type: item.bankType,
          bank_number: item.bankNumber,
        });
        setActiveIcon(item?.icon);
      }
      if (item.typeBlock === "wallet_digital") {
        form.setFieldsValue({
          block_name: item.name,
          block_type: item.typeBlock,
          wallet_digital_type: item.wallet_digital_type,
          wallet_digital_link: item.wallet_digital_link,
        });
        setActiveIcon(item?.icon);
      }
      if (item.typeBlock === "crypto") {
        form.setFieldsValue({
          block_name: item.name,
          block_type: item.typeBlock,
          crypto_type: item.crypto_type,
          crypto_address: item.crypto_address,
        });
        setActiveIcon(item?.icon);
      }
    }
  };
  const handleOk = () => {
    if (titleModal === "Thêm khối") {
      if (typeBlock === "website") {
        setContent((item) => [
          ...item,
          {
            name: form.getFieldValue().block_name,
            typeBlock: form.getFieldValue().block_type,
            link: form.getFieldValue().block_link,
            uuid: uuid(),
            icon: activeIcon,
          },
        ]);
      } else if (typeBlock === "phone") {
        setContent((item) => [
          ...item,
          {
            name: form.getFieldValue().block_name,
            typeBlock: form.getFieldValue().block_type,
            phone: form.getFieldValue().block_link,
            uuid: uuid(),
            icon: activeIcon,
          },
        ]);
      } else if (typeBlock === "send_sms") {
        setContent((item) => [
          ...item,
          {
            name: form.getFieldValue().block_name,
            typeBlock: form.getFieldValue().block_type,
            phone: form.getFieldValue().linkBlock,
            content: form.getFieldValue().contentBlock,
            uuid: uuid(),
            icon: activeIcon,
          },
        ]);
      } else if (typeBlock === "send_email") {
        setContent((item) => [
          ...item,
          {
            name: form.getFieldValue().block_name,
            typeBlock: form.getFieldValue().block_type,
            email: form.getFieldValue().linkBlock,
            content: form.getFieldValue().contentBlock,
            uuid: uuid(),
            icon: activeIcon,
          },
        ]);
      } else if (typeBlock === "save_contact") {
        setContent((item) => [
          ...item,
          {
            name: form.getFieldValue().block_name,
            typeBlock: form.getFieldValue().block_type,
            uuid: uuid(),
            icon: activeIcon,
            personInfo: {
              link: form.getFieldValue().link,
              email: form.getFieldValue().email,
              phone: form.getFieldValue().phone,
              name: form.getFieldValue().name,
              lastname: form.getFieldValue().lastname,
            },
            orgInfo: {
              position: form.getFieldValue().position,
              email: form.getFieldValue().email_org,
              phone: form.getFieldValue().phone_org,
              name: form.getFieldValue().name_org,
            },
          },
        ]);
      } else if (typeBlock === "bank") {
        setContent((item) => [
          ...item,
          {
            name: form.getFieldValue().block_name,
            typeBlock: form.getFieldValue().block_type,
            uuid: uuid(),
            bankType: form.getFieldValue().bank_type ?? "VIETCOMBANK",
            bankNumber: form.getFieldValue().bank_number,
          },
        ]);
      } else if (typeBlock === "wallet_digital") {
        setContent((item) => [
          ...item,
          {
            name: form.getFieldValue().block_name,
            typeBlock: form.getFieldValue().block_type,
            uuid: uuid(),
            wallet_digital_type:
              form.getFieldValue().wallet_digital_type ?? "MOMO",
            wallet_digital_link: form.getFieldValue().wallet_digital_link,
          },
        ]);
      } else if (typeBlock === "crypto") {
        setContent((item) => [
          ...item,
          {
            name: form.getFieldValue().block_name,
            typeBlock: form.getFieldValue().block_type,
            uuid: uuid(),
            crypto_type: form.getFieldValue().crypto_type ?? "BEP2",
            crypto_address: form.getFieldValue().crypto_address,
          },
        ]);
      }
    } else {
      if (typeBlock === "website") {
        let newContent = content.map((item) =>
          uuidItem === item.uuid
            ? {
                name: form.getFieldValue().block_name,
                typeBlock: form.getFieldValue().block_type,
                link: form.getFieldValue().block_link,
                uuid: uuidItem,
                icon: activeIcon,
              }
            : item
        );
        setContent(newContent);
      } else if (typeBlock === "phone") {
        let newContent = content.map((item) =>
          uuidItem === item.uuid
            ? {
                name: form.getFieldValue().block_name,
                typeBlock: form.getFieldValue().block_type,
                phone: form.getFieldValue().block_link,
                uuid: uuidItem,
                icon: activeIcon,
              }
            : item
        );
        setContent(newContent);
      } else if (typeBlock === "send_sms") {
        let newContent = content.map((item) =>
          uuidItem === item.uuid
            ? {
                name: form.getFieldValue().block_name,
                typeBlock: form.getFieldValue().block_type,
                phone: form.getFieldValue().linkBlock,
                content: form.getFieldValue().contentBlock,
                uuid: uuidItem,
                icon: activeIcon,
              }
            : item
        );
        setContent(newContent);
      } else if (typeBlock === "send_email") {
        let newContent = content.map((item) =>
          uuidItem === item.uuid
            ? {
                name: form.getFieldValue().block_name,
                typeBlock: form.getFieldValue().block_type,
                email: form.getFieldValue().linkBlock,
                content: form.getFieldValue().contentBlock,
                uuid: uuidItem,
                icon: activeIcon,
              }
            : item
        );
        setContent(newContent);
      } else if (typeBlock === "save_contact") {
        let newContent = content.map((item) =>
          uuidItem === item.uuid
            ? {
                name: form.getFieldValue().block_name,
                typeBlock: form.getFieldValue().block_type,
                uuid: uuidItem,
                icon: activeIcon,
                personInfo: {
                  link: form.getFieldValue().link,
                  email: form.getFieldValue().email,
                  phone: form.getFieldValue().phone,
                  name: form.getFieldValue().name,
                  lastname: form.getFieldValue().lastname,
                },
                orgInfo: {
                  position: form.getFieldValue().position,
                  email: form.getFieldValue().email_org,
                  phone: form.getFieldValue().phone_org,
                  name: form.getFieldValue().name_org,
                },
              }
            : item
        );
        setContent(newContent);
      } else if (typeBlock === "bank") {
        let newContent = content.map((item) =>
          uuidItem === item.uuid
            ? {
                name: form.getFieldValue().block_name,
                typeBlock: form.getFieldValue().block_type,
                uuid: uuidItem,
                bankType: form.getFieldValue().bank_type ?? "VIETCOMBANK",
                bankNumber: form.getFieldValue().bank_number,
              }
            : item
        );
        setContent(newContent);
      } else if (typeBlock === "wallet_digital") {
        let newContent = content.map((item) =>
          uuidItem === item.uuid
            ? {
                name: form.getFieldValue().block_name,
                typeBlock: form.getFieldValue().block_type,
                uuid: uuid(),
                wallet_digital_type:
                  form.getFieldValue().wallet_digital_type ?? "MOMO",
                wallet_digital_link: form.getFieldValue().wallet_digital_link,
              }
            : item
        );
        setContent(newContent);
      } else if (typeBlock === "crypto") {
        let newContent = content.map((item) =>
          uuidItem === item.uuid
            ? {
                name: form.getFieldValue().block_name,
                typeBlock: form.getFieldValue().block_type,
                uuid: uuid(),
                crypto_type: form.getFieldValue().crypto_type ?? "BEP2",
                crypto_address: form.getFieldValue().crypto_address,
              }
            : item
        );
        setContent(newContent);
      }
    }
    form.resetFields();

    setActiveIcon("");
    setUuidItem("");
    setTypeBlock("website");

    setBankType("VIETCOMBANK");
    setWalletDigitalType("MOMO");
    setCryptoType("BEP2");

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    form.resetFields();

    setContentBlock("");
    setNameBlock("");
    setLinkBlock("");
    setContentBlock("");
    setPersonInfo({
      link: "",
      email: "",
      phone: "",
      name: "",
      lastname: "",
    });
    setOrgInfo({
      position: "",
      email: "",
      phone: "",
      name: "",
    });
    setIsModalOpen(false);
    setActiveIcon("");
    setTypeBlock("website");
    setBankType("VIETCOMBANK");
    setWalletDigitalType("MOMO");
    setCryptoType("BEP2");
  };

  const handleChange = (value) => {
    setTypeBlock(value);
  };
  const itemsSelect = [
    {
      label: "Link",
      options: [
        {
          label: (
            <div>
              <GlobalOutlined className="mr-3" />
              <span>Website</span>
            </div>
          ),
          value: "website",
        },
      ],
    },
    {
      label: "Hành động",
      options: [
        {
          label: (
            <div>
              <PhoneOutlined className="mr-3" />
              <span>Điện thoại</span>
            </div>
          ),
          value: "phone",
        },
        {
          label: (
            <div>
              <SaveOutlined className="mr-3" />
              <span>Lưu danh bạ</span>
            </div>
          ),
          value: "save_contact",
        },
        {
          label: (
            <div>
              <SendOutlined className="mr-3" />
              <span>Gửi SMS</span>
            </div>
          ),
          value: "send_sms",
        },
        {
          label: (
            <div>
              <MailOutlined className="mr-3" />
              <span>Gửi email </span>
            </div>
          ),
          value: "send_email",
        },
      ],
    },
    {
      label: "Thanh toán",
      options: [
        {
          label: (
            <div>
              <BankOutlined className="mr-3" />
              <span>Ngân hàng</span>
            </div>
          ),
          value: "bank",
        },
        {
          label: (
            <div>
              <WalletOutlined className="mr-3" />
              <span>Ví điện tử</span>
            </div>
          ),
          value: "wallet_digital",
        },
        {
          label: (
            <div>
              <DollarOutlined className="mr-3" />
              <span>Crypto</span>
            </div>
          ),
          value: "crypto",
        },
      ],
    },
  ];
  const itemsSelectBank = [
    {
      label: "Loại ngân hàng",
      options: [
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={VIETCOMBANKIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>VIETCOMBANK</span>
            </div>
          ),
          value: "VIETCOMBANK",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={VIETTINBANKIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>Vietinbank</span>
            </div>
          ),
          value: "VIETTINBANK",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img src={BIDVIMG} alt="" className={`${cx("img-bank")}  mr-3`} />
              <span>BIDV</span>
            </div>
          ),
          value: "BIDV",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={ANGRIBANKIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>Agribank</span>
            </div>
          ),
          value: "ANGRIBANK",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={TECHCOMBANKIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>TECHCOMBANK</span>
            </div>
          ),
          value: "TECHCOMBANK",
        },

        {
          label: (
            <div className="d-flex align-center">
              <img
                src={MBBANKIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>MB BANK</span>
            </div>
          ),
          value: "MBBANK",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={MSBBANKIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>MSB BANK</span>
            </div>
          ),
          value: "MSBBANK",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={VPBANKIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>VP BANK</span>
            </div>
          ),
          value: "VPBANK",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={VIBBANKIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>VIB BANK</span>
            </div>
          ),
          value: "VIBBANK",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={TPBANKIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>TP BANK</span>
            </div>
          ),
          value: "TPBANK",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={ACBBANKIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>ACB BANK</span>
            </div>
          ),
          value: "ACBBANK",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={SACOMBANKIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>SACOMBANK</span>
            </div>
          ),
          value: "SACOMBANK",
        },
      ],
    },
  ];
  const itemsSelectCrypto = [
    {
      label: "Mạng lưới",
      options: [
        {
          label: (
            <div className="d-flex align-center">
              <img src={BEP20} alt="" className={`${cx("img-bank")}  mr-3`} />
              <span>BEP2</span>
            </div>
          ),
          value: "BEP2",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img src={BEP20} alt="" className={`${cx("img-bank")}  mr-3`} />
              <span>BEP20</span>
            </div>
          ),
          value: "BEP20",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img src={ER20} alt="" className={`${cx("img-bank")}  mr-3`} />
              <span>ER20</span>
            </div>
          ),
          value: "ER20",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img src={TRC20} alt="" className={`${cx("img-bank")}  mr-3`} />
              <span>TRC20</span>
            </div>
          ),
          value: "TRC20",
        },
      ],
    },
  ];
  // items ví điện tử
  const itemsSelectWalletDigital = [
    {
      label: "Loại ví điện tử",
      options: [
        {
          label: (
            <div className="d-flex align-center">
              <img src={MOMOIMG} alt="" className={`${cx("img-bank")}  mr-3`} />
              <span>MOMO</span>
            </div>
          ),
          value: "MOMO",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={PAYPALIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>PAYPAL</span>
            </div>
          ),
          value: "PAYPAL",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={SHOPEEPAYIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>SHOPEEPAY</span>
            </div>
          ),
          value: "SHOPEEPAY",
        },
        {
          label: (
            <div className="d-flex align-center">
              <img
                src={ZALOPAYIMG}
                alt=""
                className={`${cx("img-bank")}  mr-3`}
              />
              <span>ZALOPAY</span>
            </div>
          ),
          value: "ZALOPAY",
        },
      ],
    },
  ];
  //Test drag and dropp
  const getListStyle = (isDraggingOver) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  });
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    position: "relative",
    background: "white",
    marginTop: "15px",
    marginBottom: "15px",
    width: "90%",
    borderRadius: "20px",
    height: "60px",
    border: "1px solid #d9d9d9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
    ...draggableStyle,
  });
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      content,
      result.source.index,
      result.destination.index
    );
    setContent(items);
  };
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      //   let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        setBaseURL(baseURL);
        setPreViewAvatar(baseURL);
      };
    });
  };
  const handleDeleteBlock = (uuid) => {
    let newContent = content.filter((item) => item.uuid !== uuid);
    setContent(newContent);
  };
  const handleSave = async () => {
    setIsLoading(true);
    const dataRequest = {
      avatar: previewAvatar,
      content: JSON.stringify(content),
      nickName: nickName,
      description: description,
      userName: userName,
      templates: template?.id,
    };
    try {
      const response = await UserServices.update(dataRequest);
      if (response.data.status === 200) {
        toast.success("Lưu giao diện thành công", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        loadUser();
      } else {
        toast.error(response?.data?.message ?? "Có lỗi xảy ra", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      toast.error("Có lỗi xảy ra", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setIsLoading(false);
  };
  console.log({ previewAvatar });
  return (
    <div>
      {isLoading && <Loader />}
      <div className={cx("wrap-sub-header")}>
        <div className={cx("sub-header")}>
          <div style={{ width: "20%" }}>
            <Button
              className="button-secondary"
              icon={<EyeOutlined style={{ fontWeight: 600 }} />}
              block
              onClick={handleShowModalDisplay}
              style={{ height: "50px", fontWeight: 600 }}
            ></Button>
          </div>
          <div style={{ width: "55%" }}>
            <Button
              type="primary"
              icon={<PlusOutlined style={{ fontWeight: 600 }} />}
              block
              onClick={(e) => {
                showModal("Thêm khối");
              }}
              style={{ height: "50px", fontWeight: 600 }}
            >
              Thêm khối
            </Button>
          </div>
          <div style={{ width: "20%" }}>
            <Button
              className="button-secondary"
              icon={<SaveOutlined style={{ fontWeight: 600 }} />}
              block
              onClick={handleSave}
              style={{ height: "50px", fontWeight: 600 }}
            ></Button>
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-center"
        style={{
          width: "100vw",
          marginTop: "60px",
          height: "40px",
          color: "white",
          textAlign: "center",
          fontSize: "11px",
          backgroundColor: "#495158",
        }}
      >
        <div
          style={{
            width: "90%",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            lineHeight: "40px",
            textAlign: "center",
          }}
        >
          Link truy cập của bạn là:
          <a
            href={`http://liamtap.site/profile/${nickName}`}
            alt=""
            target="_blank"
            rel="noopener noreferrer"
            className={cx("link")}
          >
            {" "}
            https://liamtap.site/profile/{nickName}
          </a>
        </div>
      </div>
      <div
        className="d-flex justify-center align-center"
        style={{
          height: "40px",
          textAlign: "center",
          fontSize: "11px",
          lineHeight: "15px",
          backgroundColor: "#B9C2CA",
        }}
      >
        <div style={{ color: "white" }}>
          Bạn muốn thay đổi background?{" "}
          <span
            style={{ color: "rgba(179, 11, 11, 0.7)" }}
            className="text-primary"
            onClick={(e) => {
              setIsModalTemplate(true);
            }}
          >
            Tại đây
          </span>
        </div>
      </div>

      <div
        className={cx("container")}
        style={{
          backgroundColor: `${template?.color}`,
          backgroundImage: `${template?.src ? `url(${template?.src})` : ""}`,
        }}
      >
        <div className={cx("header")}>
          <div>
            <div className={cx("avatar")}>
              <img
                src={previewAvatar ? previewAvatar : avatar}
                alt="Avatar"
                className={cx("img-avatar")}
                onClick={(e) => {
                  if (baseURL) {
                    setIsModalEditAvatar(true);
                  } else {
                    toast.error("Bạn chưa có avatar", {
                      position: "top-center",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  }
                }}
              ></img>

              <div className={cx("add-img")}>
                <label htmlFor="file" style={{ cursor: "pointer" }}>
                  <PlusCircleOutlined />
                </label>
                <input
                  type={"file"}
                  className={cx("custom-file-input")}
                  accept="image/png, image/gif, image/jpeg"
                  id="file"
                  name="file"
                  onChange={(e) => {
                    let img = e.target.files[0];

                    if (img) {
                      if (img.size > 2097152) {
                        toast.error(
                          "File tải lên quá lớn, vui lòng chọn ảnh dưới 2MB",
                          {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          }
                        );
                      } else {
                        getBase64(img);
                      }
                    }
                  }}
                ></input>
              </div>
            </div>
          </div>
          <div className={cx("name")}>
            <b style={{ position: "relative" }}>
              {nickName}

              <EditOutlined
                className={cx("edit-name")}
                onClick={showModalHeader}
              />
            </b>
          </div>
          {userName && <div className={cx("username")}>{userName}</div>}
          {description && (
            <div className={cx("description")}>{description}</div>
          )}
        </div>

        <DragDropContext className={cx("content")} onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className={cx("droppable-custom")}
              >
                {content &&
                  content.map((item, index) => (
                    <Draggable
                      key={item.uuid}
                      draggableId={item.uuid}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        let IconComponent = null;
                        if (item?.icon) {
                          IconComponent = Icons[item.icon];
                        }
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            onClick={(e) => {
                              showModal("Sửa khối", item);
                            }}
                          >
                            <div>
                              <div className={cx("button-icon")}>
                                {IconComponent ? (
                                  <IconComponent style={{ fontSize: "35px" }} />
                                ) : null}
                                {item?.bankType === "VIETCOMBANK" && (
                                  <img
                                    src={VIETCOMBANKIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.bankType === "VIETTINBANK" && (
                                  <img
                                    src={VIETTINBANKIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.bankType === "TECHCOMBANK" && (
                                  <img
                                    src={TECHCOMBANKIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.bankType === "ANGRIBANK" && (
                                  <img
                                    src={ANGRIBANKIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.bankType === "BIDV" && (
                                  <img
                                    src={BIDVIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}

                                {item?.bankType === "MBBANK" && (
                                  <img
                                    src={MBBANKIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.bankType === "MSBBANK" && (
                                  <img
                                    src={MSBBANKIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.bankType === "VPBANK" && (
                                  <img
                                    src={VPBANKIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.bankType === "VIBBANK" && (
                                  <img
                                    src={VIBBANKIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.bankType === "TPBANK" && (
                                  <img
                                    src={TPBANKIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.bankType === "SACOMBANK" && (
                                  <img
                                    src={SACOMBANKIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.bankType === "ACBBANK" && (
                                  <img
                                    src={ACBBANKIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.wallet_digital_type === "MOMO" && (
                                  <img
                                    src={MOMOIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.wallet_digital_type === "PAYPAL" && (
                                  <img
                                    src={PAYPALIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.wallet_digital_type === "SHOPEEPAY" && (
                                  <img
                                    src={SHOPEEPAYIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.wallet_digital_type === "ZALOPAY" && (
                                  <img
                                    src={ZALOPAYIMG}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.crypto_type === "BEP2" && (
                                  <img
                                    src={BEP20}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.crypto_type === "BEP20" && (
                                  <img
                                    src={BEP20}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.crypto_type === "ER20" && (
                                  <img
                                    src={ER20}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                                {item?.crypto_type === "TRC20" && (
                                  <img
                                    src={TRC20}
                                    alt=""
                                    className={cx("img-bank-render")}
                                  ></img>
                                )}
                              </div>
                              <b style={{ fontSize: "18px" }}>{item?.name}</b>
                            </div>

                            <div
                              className={cx("button-delete")}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsModalDelete(true);
                                setItemSelected(item);
                              }}
                            >
                              <CloseOutlined style={{ fontSize: "15px" }} />
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Modal
        title={titleModal}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        okText={"Đồng ý"}
        cancelText="Hủy"
        style={{ top: 10 }}
        bodyStyle={{ height: "500px", overflow: "auto" }}
        // className={cx('ant-modal-custom')}
      >
        <Form layout="vertical" form={form} onFinish={handleOk}>
          <Form.Item
            label={<div>Tên khối : </div>}
            name="block_name"
            value={nameBlock}
            onChange={(e) => {
              setNameBlock(e.target.value);
            }}
            rules={[
              { required: true, message: "Tên khối không được bỏ trống" },
            ]}
          >
            <Input placeholder="Nhập tên khối" size="large" />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Form.Item
              label={<div className="text-uppercase">Loại khối : </div>}
              name={"block_type"}
            >
              <Select
                name="block_type"
                defaultValue={typeBlock}
                value={typeBlock}
                onChange={handleChange}
                options={itemsSelect}
                size="large"
              />
            </Form.Item>
            <div className="text-uppercase mb-3">Thông tin truy cập : </div>
            {(typeBlock === "website" || typeBlock === "phone") && (
              <Form.Item
                name="block_link"
                value={linkBlock}
                onChange={(e) => {
                  setLinkBlock(e.target.value);
                }}
              >
                <Input
                  placeholder={
                    typeBlock === "website" ? "http://" : "Nhập số điện thoại"
                  }
                  size="large"
                />
              </Form.Item>
            )}
            {(typeBlock === "send_email" || typeBlock === "send_sms") && (
              <>
                <Form.Item
                  name={"linkBlock"}
                  value={linkBlock}
                  onChange={(e) => {
                    setLinkBlock(e.target.value);
                  }}
                >
                  <Input
                    placeholder={
                      typeBlock === "send_email"
                        ? "example@email.com"
                        : "Nhập số điện thoại"
                    }
                    className="mb-3"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name={"contentBlock"}
                  value={contentBlock}
                  onChange={(e) => {
                    setContentBlock(e.target.value);
                  }}
                >
                  <Input
                    placeholder={
                      typeBlock === "send_email"
                        ? "Chủ đề"
                        : "Nội dung tin nhắn"
                    }
                    size="large"
                  />
                </Form.Item>
              </>
            )}
            {typeBlock === "save_contact" && (
              <>
                <div className="mb-3">Cá nhân : </div>
                <Row className="justify-space-between">
                  <Col span={11} className="mb-3 mr-2">
                    <Form.Item
                      name={"name"}
                      value={personInfo.name}
                      onChange={(e) => {
                        handlePersonInput(`name`, e.target.value);
                      }}
                    >
                      <Input placeholder="Tên của bạn" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={11} className="mb-3">
                    <Form.Item
                      name={"lastname"}
                      value={personInfo.lastname}
                      onChange={(e) => {
                        handlePersonInput(`lastname`, e.target.value);
                      }}
                    >
                      <Input placeholder="Họ của bạn" size="large" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name={"link"}
                  value={personInfo.link}
                  onChange={(e) => {
                    handlePersonInput(`link`, e.target.value);
                  }}
                >
                  <Input placeholder="Website" className="mb-3" size="large" />
                </Form.Item>
                <Form.Item
                  name={"email"}
                  value={personInfo.email}
                  onChange={(e) => {
                    handlePersonInput(`email`, e.target.value);
                  }}
                >
                  <Input placeholder="Email" className="mb-3" size="large" />
                </Form.Item>
                <Form.Item
                  name={"phone"}
                  value={personInfo.phone}
                  onChange={(e) => {
                    handlePersonInput(`phone`, e.target.value);
                  }}
                >
                  <Input
                    placeholder="Số điện thoại"
                    className="mb-3"
                    size="large"
                  />
                </Form.Item>

                <div className="mb-3">Công ty : </div>
                <Row className="justify-space-between">
                  <Col span={11} className="mb-3 mr-2">
                    <Form.Item
                      name={"name_org"}
                      value={orgInfo.name}
                      onChange={(e) => {
                        handleOrgInput(`name`, e.target.value);
                      }}
                    >
                      <Input placeholder="Tên công ty" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={11} className="mb-3">
                    <Form.Item
                      name={"position"}
                      value={orgInfo.position}
                      onChange={(e) => {
                        handleOrgInput(`position`, e.target.value);
                      }}
                    >
                      <Input placeholder="Chức danh" size="large" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name={"email_org"}
                  value={orgInfo.email}
                  onChange={(e) => {
                    handleOrgInput(`email`, e.target.value);
                  }}
                >
                  <Input
                    placeholder="Email công ty"
                    className="mb-3"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name={"phone_org"}
                  value={orgInfo.phone}
                  onChange={(e) => {
                    handleOrgInput(`phone`, e.target.value);
                  }}
                >
                  <Input
                    placeholder="Số điện thoại của công ty"
                    className="mb-3"
                    size="large"
                  />
                </Form.Item>
              </>
            )}
            {typeBlock === "bank" && (
              <>
                <Form.Item
                  label={<div>Loại ngân hàng : </div>}
                  name={"bank_type"}
                >
                  <Select
                    name="bank_type"
                    defaultValue={bankType}
                    value={bankType}
                    onChange={(value) => {
                      setBankType(value);
                    }}
                    options={itemsSelectBank}
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name={"bank_number"}
                  value={bankNumber}
                  onChange={(e) => {
                    setBankNumber(e.target.value);
                  }}
                >
                  <Input
                    placeholder={"Số tài khoản"}
                    className="mb-3"
                    size="large"
                  />
                </Form.Item>
              </>
            )}
            {typeBlock === "wallet_digital" && (
              <>
                <Form.Item
                  label={<div>Loại ví điện tử : </div>}
                  name={"wallet_digital_type"}
                >
                  <Select
                    name="wallet_digital_type"
                    defaultValue={walletDigitalType}
                    value={walletDigitalType}
                    onChange={(value) => {
                      setWalletDigitalType(value);
                    }}
                    options={itemsSelectWalletDigital}
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name={"wallet_digital_link"}
                  value={linkWalletDigital}
                  onChange={(e) => {
                    setLinkWalletDigital(e.target.value);
                  }}
                >
                  <Input
                    placeholder={"Nhập đường dẫn ví điện tử"}
                    className="mb-3"
                    size="large"
                  />
                </Form.Item>
              </>
            )}

            {typeBlock === "crypto" && (
              <>
                <Form.Item label={<div>Mạng lưới : </div>} name={"crypto_type"}>
                  <Select
                    name="crypto_type"
                    defaultValue={cryptoType}
                    value={cryptoType}
                    onChange={(value) => {
                      setCryptoType(value);
                    }}
                    options={itemsSelectCrypto}
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name={"crypto_address"}
                  value={cryptoAddress}
                  onChange={(e) => {
                    setCryptoAddress(e.target.value);
                  }}
                >
                  <Input
                    placeholder={"Địa chỉ ví"}
                    className="mb-3"
                    size="large"
                  />
                </Form.Item>
              </>
            )}
          </div>
          {!(
            typeBlock === "bank" ||
            typeBlock === "wallet_digital" ||
            typeBlock === "crypto"
          ) && (
            <Form.Item
              label={<div className="text-uppercase">Icons : </div>}
              name="block_icon"
            >
              <div className={cx("list-icon")}>
                {listIconFa.map((item, index) => {
                  let IconComponent = Icons[item];
                  return (
                    <div
                      key={uuid()}
                      className={`${cx("item-icon")} ${
                        item === activeIcon ? cx("active-icon") : ""
                      }`}
                      onClick={(e) => {
                        setActiveIcon(item);
                      }}
                    >
                      <IconComponent style={{ fontSize: "30px" }} />
                    </div>
                  );
                })}
              </div>
            </Form.Item>
          )}
        </Form>
      </Modal>
      {/* Modal thay đổi tên và mô tả người dùng */}
      <Modal
        title="Chỉnh sửa thông tin"
        open={isModalHeaderOpen}
        onOk={formHeader.submit}
        onCancel={handleCancelHeader}
        okText={"Đồng ý"}
        cancelText="Hủy"
      >
        <Form layout="vertical" form={formHeader} onFinish={handleOkHeader}>
          <Form.Item
            label={<div>Nickname : </div>}
            name="nickname"
            value={nickNameChange}
            onChange={(e) => {
              setNickNameChange(e.target.value);
            }}
            rules={[
              { required: true, message: "Nickname không được bỏ trống" },
              { type: "string", min: 5, message: "Nickname sai định dạng" },
              {
                validator: (_, value) => {
                  if (value && value.length >= 5) {
                    let check = new RegExp(/^[a-zA-Z0-9]+$/).test(value);
                    if (check) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Nickname sai định dạng"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="Nhập nickname" size="large" />
          </Form.Item>
          <Form.Item
            label={<div className="text-uppercase">Tên riêng : </div>}
            name="userNameChange"
            value={userNameChange}
            onChange={(e) => {
              setUserNameChange(e.target.value);
            }}
          >
            <Input placeholder="Nhập tên riêng" size="large" />
          </Form.Item>
          <Form.Item
            label={<div className="text-uppercase">Mô tả : </div>}
            name="description"
            value={descriptionChange}
            onChange={(e) => {
              setDescriptionChange(e.target.value);
            }}
          >
            <Input placeholder="Nhập mô tả" size="large" />
          </Form.Item>
        </Form>
      </Modal>

      <ViewDisplay
        avatar={previewAvatar}
        nickName={nickName}
        description={description}
        content={content}
        isModalOpen={isModalOpenViewDisplay}
        handleShowModal={handleShowModalDisplay}
        template={template}
        userName={userName}
      ></ViewDisplay>
      <Modal
        title="Chỉnh sửa avatar"
        open={isModalEditAvatar}
        onOk={async () => {
          if (cropRef) {
            const dataUrl = cropRef.current.getImage().toDataURL();
            setPreViewAvatar(dataUrl);
          }
          setIsModalEditAvatar(false);
        }}
        onCancel={() => {
          setIsModalEditAvatar(false);
        }}
        okText={"Đồng ý"}
        cancelText="Hủy"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AvatarEditor
            ref={cropRef}
            image={baseURL}
            width={300}
            height={300}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.5}
            rotate={0}
            borderRadius={150}
          />
        </div>
      </Modal>
      <Modal
        title="Thông báo"
        open={isModalDelete}
        onOk={() => {
          handleDeleteBlock(itemSelected.uuid);
          setIsModalDelete(false);
        }}
        onCancel={() => {
          setIsModalDelete(false);
        }}
        okText={"Đồng ý"}
        cancelText="Hủy"
      >
        <div>
          Bạn có chắc chắn muốn xóa khối <b>{itemSelected?.name}</b> này không?
        </div>
      </Modal>
      <Modal
        title="Thay đổi background"
        open={isModalTemplate}
        onOk={() => {
          setTemplate(previewTemplate);
          setPreviewTemplate(null);
          setIsModalTemplate(false);
        }}
        onCancel={() => {
          setIsModalTemplate(false);
          setPreviewTemplate(null);
        }}
        okText={"Đồng ý"}
        cancelText="Hủy"
        style={{ top: "10px" }}
      >
        <CardTemplate
          previewTemplate={previewTemplate}
          setPreviewTemplate={setPreviewTemplate}
        />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Display;
