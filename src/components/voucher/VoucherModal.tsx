import { useState } from 'react';

interface PassengerData {
  name: string;
  document: string;
  email: string;
  phone: string;
  birthdate: string;
  gender: string;
  country: string;
}

interface RaiderData {
  id_raider: string;
  value: string;
  cost: string;
  name: string;
  desc: string;
}

interface VoucherTranslations {
  tabVoucher: string;
  tabPassengers: string;
  tabAdditional: string;
  voucherDetails: string;
  passengers: string;
  raiders: string;
  downloadPDF: string;
  noPassengers: string;
  noRaiders: string;
  document: string;
  email: string;
  phone: string;
  country: string;
}

interface VoucherModalProps {
  show: boolean;
  onClose: () => void;
  voucherData: Record<string, unknown> | null;
  passengersData: PassengerData[] | null;
  raidersData: RaiderData[] | null;
  t: VoucherTranslations;
}

export default function VoucherModal({ 
  show, 
  onClose, 
  voucherData, 
  passengersData, 
  raidersData,
  t
}: VoucherModalProps) {
  const [activeTab, setActiveTab] = useState('voucher');

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: '20px', border: 'none' }}>
          <div className="modal-header justify-content-center pt-4" style={{ borderBottom: '1px solid #eee' }}>
            <h4 className="modal-title">{t.voucherDetails}</h4>
            <button 
              type="button" 
              className="btn-close position-absolute end-0 me-3" 
              onClick={onClose}
            />
          </div>
          
          <div className="modal-body px-0 pb-0">
            <ul className="nav nav-tabs justify-content-center border-bottom-0" style={{ marginTop: '-50px' }}>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'voucher' ? 'active' : ''}`}
                  onClick={() => setActiveTab('voucher')}
                  style={{ 
                    color: activeTab === 'voucher' ? '#001937' : '#666',
                    backgroundColor: activeTab === 'voucher' ? '#fff' : 'transparent',
                    borderRadius: '10px 10px 0 0',
                    border: 'none',
                    padding: '10px 20px'
                  }}
                >
                  {t.tabVoucher}
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'passengers' ? 'active' : ''}`}
                  onClick={() => setActiveTab('passengers')}
                  style={{ 
                    color: activeTab === 'passengers' ? '#001937' : '#666',
                    backgroundColor: activeTab === 'passengers' ? '#fff' : 'transparent',
                    borderRadius: '10px 10px 0 0',
                    border: 'none',
                    padding: '10px 20px'
                  }}
                >
                  {t.tabPassengers}
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'additional' ? 'active' : ''}`}
                  onClick={() => setActiveTab('additional')}
                  style={{ 
                    color: activeTab === 'additional' ? '#001937' : '#666',
                    backgroundColor: activeTab === 'additional' ? '#fff' : 'transparent',
                    borderRadius: '10px 10px 0 0',
                    border: 'none',
                    padding: '10px 20px'
                  }}
                >
                  {t.tabAdditional}
                </button>
              </li>
            </ul>

            <div className="tab-content p-4" style={{ backgroundColor: '#fff', minHeight: '300px' }}>
              {activeTab === 'voucher' && (
                <div className="tab-pane active">
                  <div className="row">
                    {voucherData && Object.entries(voucherData).map(([key, value]) => (
                      <div className="col-md-6 mb-3" key={key}>
                        <strong style={{ textTransform: 'capitalize' }}>
                          {key.replace(/_/g, ' ')}:
                        </strong>
                        <p className="mb-0 text-muted">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'passengers' && (
                <div className="tab-pane active">
                  {passengersData && passengersData.length > 0 ? (
                    passengersData.map((passenger, index) => (
                      <div key={index} className="card mb-3" style={{ borderRadius: '10px' }}>
                        <div className="card-body">
                          <h5 className="card-title">{passenger.name || `Pasajero ${index + 1}`}</h5>
                          <p className="mb-1"><strong>{t.document}:</strong> {passenger.document}</p>
                          <p className="mb-1"><strong>{t.email}:</strong> {passenger.email}</p>
                          <p className="mb-1"><strong>{t.phone}:</strong> {passenger.phone}</p>
                          <p className="mb-0"><strong>{t.country}:</strong> {passenger.country}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted">{t.noPassengers}</p>
                  )}
                </div>
              )}

              {activeTab === 'additional' && (
                <div className="tab-pane active">
                  {raidersData && raidersData.length > 0 ? (
                    raidersData.map((raider, index) => (
                      <div key={index} className="card mb-3" style={{ borderRadius: '10px' }}>
                        <div className="card-body">
                          <h5 className="card-title">{raider.name}</h5>
                          <p className="mb-1"><strong>ID:</strong> {raider.id_raider}</p>
                          <p className="mb-0">{raider.desc}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted">{t.noRaiders}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="modal-footer justify-content-center pb-4" style={{ borderTop: 'none' }}>
            <button 
              type="button" 
              className="btn bg_blue2 text-white px-5" 
              style={{ fontSize: '16px', borderRadius: '10px' }}
              onClick={() => window.print()}
            >
              {t.downloadPDF}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
