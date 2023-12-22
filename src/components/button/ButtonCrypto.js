import React, { useState } from "react";
import styles from "@pages/Bio/styleNewBio.module.scss";
import classNames from "classnames/bind";
import { Button, Modal } from "antd";
import * as Icons from "react-icons/fa";
// mạng lưới crypto
import BEP20 from "@assets/images/bep20.png";
import TRC20 from "@assets/images/trc20.png";
import ER20 from "@assets/images/er20.png";
//
import { CopyOutlined } from "@ant-design/icons";
import copyToClipboard from "helpers/copyToClipboard";
import { toast } from "react-toastify";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);

const ButtonCrypto = ({ link, name, icon, crypto_address, crypto_type }) => {
  let IconComponent = null;
  if (icon) {
    IconComponent = Icons[icon];
  }
  const [isShow, setIsShow] = useState(false);
  let truncatedText = crypto_address;
  if (crypto_address.length > 10) {
    truncatedText = `${crypto_address.substring(
      0,
      6
    )}...${crypto_address.substring(crypto_address.length - 4)}`;
  }

  return (
    <div className={cx("button")}>
      <div
        onClick={(e) => {
          setIsShow(true);
        }}
        style={{ textDecoration: "none" }}
      >
        <Button className={cx("button-network")}>
          <div className={cx("button-icon")}>
            {/* <FontAwesomeIcon icon="fa-brands fa-facebook" /> */}
            {IconComponent ? (
              <IconComponent style={{ fontSize: "35px" }} />
            ) : null}
            {crypto_type === "BEP2" && (
              <img src={BEP20} alt="" className={cx("img-bank-render")}></img>
            )}
            {crypto_type === "BEP20" && (
              <img src={BEP20} alt="" className={cx("img-bank-render")}></img>
            )}
            {crypto_type === "TRC20" && (
              <img src={TRC20} alt="" className={cx("img-bank-render")}></img>
            )}
            {crypto_type === "ER20" && (
              <img src={ER20} alt="" className={cx("img-bank-render")}></img>
            )}
          </div>
          <div>
            <b style={{ fontSize: "18px" }}>{name}</b>
          </div>
        </Button>
      </div>
      <Modal
        title="Thông tin giao dịch"
        open={isShow}
        onCancel={() => {
          setIsShow(false);
        }}
        footer={null}
      >
        <div>
          <div className="mt-2">
            Mạng lưới : <b>{crypto_type}</b>
          </div>
          <div className="mt-2">Địa chỉ ví : </div>
          <div className="w-100 mt-2">
            <Button
              className="w-100"
              style={{ height: "50px", fontSize: "25px", position: "relative" }}
              onClick={() => {
                copyToClipboard(crypto_address);
                toast.success("Copy thành công", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }}
            >
              {truncatedText}
              <CopyOutlined
                style={{
                  fontSize: "30px",
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  color: "#d1d1d1",
                }}
              />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ButtonCrypto;
