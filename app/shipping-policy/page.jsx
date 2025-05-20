import React from "react";
import styles from "./../../styles/information/PrivacyPolicy.module.css"
import Link from "next/link";

const privacyPolicyContent = [
    {
        bolckTitle: "Order Processing and Fulfillment",
        content: [
            {
                type: "list-item",
                content: "All orders are processed within a maximum of 4 business days. Orders may be shipped or delivered on weekends or holidays."
            },
            {
                type: "list-item",
                content: "If we are experiencing a high volume of orders or any unforeseen delays, we will inform you promptly."
            }
        ]
    },
    {
        bolckTitle: "Shipping Partners",
        content: [
            {
                type: "list-item",
                content: "For orders within Luxembourg, your items will typically be fulfilled by our local Luxembourgish delivery partners, Xpress Logistics, or Lux Post."
            },
            {
                type: "list-item",
                content: "Orders outside of Luxembourg will be fulfilled by a different set of trusted delivery partners."
            }
        ]
    },
    {
        bolckTitle: "Shipping Rates",
        content: [
            {
                type: "list-item",
                content: "Shipping charges for your order will be calculated and displayed at checkout."
            },
            {
                type: "list-item",
                content: "Any additional customs duties and taxes for international orders are the responsibility of the customer."
            }
        ]
    },
    {
        bolckTitle: "Estimated Delivery Times",
        content: [
            {
                type: "list-item",
                content: "Estimated delivery times are provided during the checkout process and may vary depending on the destination and shipping method selected."
            },
            {
                type: "list-item",
                content: "indiansupermarket.eu is not responsible for any delays caused by customs clearance processes, local postal services, or other external factors."
            }
        ]
    },
    {
        bolckTitle: "Tracking Information",
        content: [
            {
                type: "list-item",
                content: "Once your order has been shipped, you will receive an email confirmation with tracking information. Please use this information to track your order's delivery status."
            }
        ]
    },
    {
        bolckTitle: "Shipping Destinations",
        content: [
            {
                type: "list-item",
                content: "We currently ship within Luxembourg, neighboring towns in Belgium and Germany.Shipping options and rates vary based on the destination."
            }
        ]
    },
    {
        bolckTitle: "Privacy and Data Protection",
        content: [
            {
                type: "list-item",
                content: "At indiansupermarket.eu, we highly value your privacy and personal data. We take reasonable precautions and follow industry best practices to ensure that your personal information is protected. We strive to prevent any inappropriate loss, misuse, access, disclosure, alteration, or destruction of your personal data."
            }
        ]
    },
    {
        bolckTitle: "Contact Information",
        content: [
            {
                type: "list-item",
                content: "If you have any questions or concerns regarding our shipping policy, please contact us at info@indiansupermarket.eu. We are dedicated to providing excellent customer service and will do our best to assist you."
            }
        ]
    },
    {
        bolckTitle: "Please Note:",
        content: [
            {
                type: "list-item",
                content: "Refund eligibility is determined on a case-by-case basis.",
            },
            {
                type: "list-item",
                content: "indiansupermarket.eu reserves the right to update or modify this refund policy at any time without prior notice.Please review this policy periodically for any changes.",
            }
        ]
    },
    {
        bolckTitle: "",
        content: [
            {
                type: "text",
                content: "By placing an order with indiansupermarket.eu, you acknowledge and agree to abide by this refund policy."
            }
        ]
    }
]

export default function PrivacyPolicy() {
    return (
        <div className={styles.container} >
            <div className={styles.privacy_policy}>
                <div className={styles.privacy_policy_content}>
                    <div className={styles.pageTitle}>Shipping Policy</div>
                    <div>
                        {
                            privacyPolicyContent?.map((block, index) => {
                                return (
                                    <div key={index}>
                                        <div className="text-xl font-medium my-6">{block?.bolckTitle && (`${index + 1}. `)}{block?.bolckTitle}</div>
                                        <ul>
                                            {
                                                block?.content?.map((sub_item, ind) => {
                                                    return (
                                                        <li key={ind} className={`my-4 ${sub_item?.type === "list-item" ? 'list-disc ml-10' : 'list-none'}`}>
                                                            {sub_item?.content}
                                                            {
                                                                sub_item?.external_resources?.map((resource, i) => {
                                                                    return (
                                                                        <Link href={resource} key={i} className="text-blue-500 ml-[10px]" target="_blank" rel="noreferrer">
                                                                            {resource}
                                                                        </Link>
                                                                    );
                                                                })
                                                            }
                                                        </li>
                                                    );
                                                })
                                            }

                                        </ul>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}